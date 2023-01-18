if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register("sw.js").then(registeration => {
      console.log("SW Registered");
      console.log(registeration);
    }).catch(error => {
      console.log("SW Failed");
      console.log(error);
    })
  }