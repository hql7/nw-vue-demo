
const port = 8687;
module.exports = {
    publicPath: './',
    devServer: {
        port,
        // inline: true,
        open: 'nw',
        /* after() {
            require('./config/dev-nw')('http://localhost:' + port)
        } */
    },
    // configureWebpack: (config) => {
    //     config.target = 'node-webkit'
    // },
    productionSourceMap: false,
}