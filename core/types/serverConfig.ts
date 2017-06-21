export abstract class ServerConfig {
    /**
     * Server IP to listen on
     * Default is 0.0.0.0 (all interfaces)
     */
    bindIP: string;
    /**
     * Port number
     * Default is 5080/5443
     */
    port: number;
    /**
     * TLS certificate
     *
     * Provide either an absolute path to the cerificate file or the file contents as a Buffer
     */
    sslCert: string | Buffer;
    /**
     * Private key
     *
     * Provide either an absolute path to the key file or the file contents as a Buffer
     */
    privateKey: string | Buffer;
    /**
     * Secure key used for encryption
     */
    secretKey: string;
    /**
     * Relative path to folder of route definition files
     */
    routesFolder: string;
}