module.exports={
    // chainWebpack:config=>{
    //   config.plugins.delete("prefetch")
    // },
    devServer: {
      proxy: {
        '/': { 
          target: `http://localhost:8080/v1`,
          changeOrigin: true 
        }
      }
    }
  }