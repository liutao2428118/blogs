import createApp from './app'

export default context => {
    return new Promise((resolve, reject) => {
        const { app, router, store } = createApp()

        router.push(context.url)
        
        router.onReady(() => {
            const matchedComponents = router.getMatchedComponents()
            console.log(matchedComponents)
            if (!matchedComponents.length) {
                return reject(new Error('no component matched'))
            }
            const promiseArr = matchedComponents.map(Component => {
                if (Component.asyncData) {
                    return Component.asyncData({
                        app,
                        router,
                        store
                    })
                }
            })
            Promise.all(promiseArr).then(data => {
                context.state = store.state
                context.router = router
                resolve(app)
            })
        })
    })
}
