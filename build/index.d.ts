declare const createSecureServer: any;
declare const readFileSync: any;
declare const resolve: any;
declare const getType: any, getExtension: any;
declare const Api: any;
declare class Server {
    PORT: number;
    http2: () => void;
    graphql: (query: any) => any;
}
