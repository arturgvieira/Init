const { createSecureServer } = require('http2');
const { readFileSync } = require('fs');
const { resolve } = require('path');
const { getType, getExtension } = require('mime');
// Dependencies
const Api = require('./api');

class Server {
  PORT = process.env.PORT ? 443 : 8443;

  http2 = () => {
    const options = {
      allowHTTP1: true,
      key: readFileSync(resolve('./build/ssl/key.pem')),
      cert: readFileSync(resolve('./build/ssl/cert.pem')),
    };
    // Create a secure HTTP/2 server
    const server = createSecureServer(options);
    server.listen(this.PORT, () => console.info('Server Ready: ', this.PORT));
    server.on('error', (err: any) => console.error('Error: ', err));
    server.on('stream', async (stream: any, headers: any) => {
      const url: any = headers[':path'];
      const mime = /^\/graphql$/.test(url)
        ? 'application/json'
        : getType(url) || 'text/html';
      let query: any = '';
      let result: any;
      stream.on('data', async (chunk: any) => {
        query += chunk;
      });
      console.info('web: ', url.substring(url.lastIndexOf('/')), mime);
      stream.on('end', async () => {
        stream.respond({
          [':status']: 200,
          ['Content-Type']: mime,
          ['Upgrade-Insecure-Requests']: 1,
          ['Access-Control-Allow-Origin']: '*',
          ['Cross-Origin-Resource-Policy']: 'cross-origin',
          ['Access-Control-Request-Method']: 'HEAD, OPTIONS, GET, POST',
          ['Access-Control-Allow-Headers']:
            'Authorization, Content-Type, Origin',
          ['Access-Control-Allow-Credentials']: true,
          ['Access-Control-Expose-Headers']: [
            'Access-Control-Allow-Origin',
            'Access-Control-Allow-Headers',
            'Access-Control-Allow-Credentials',
            'Cross-Origin-Resource-Policy',
          ],
        });
        if (/\/graphql$/.test(url)) {
          result = await this.graphql(query);
          stream.write(JSON.stringify(result));
        } else
          stream.write(
            readFileSync(resolve(`./build${url === '/' ? '/index.html' : url}`))
          );
        stream.end();
      });
      stream.on('error', (error: any) => console.error(error));
    });
  };

  graphql = (query: any): any => new Api().graphql(query);
}

new Server().http2();
