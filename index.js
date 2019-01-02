module.exports = function AfkBg(dispatch) {
    let location = null,
        locRealTime = 0
    
    dispatch.hook('C_PLAYER_LOCATION', 5, event => {
        location = event
        locRealTime = Date.now()
    })
    
    dispatch.hook('S_SYSTEM_MESSAGE', 1, (event) => {
        if (event.message.startsWith("@1636")) {
            dispatch.toServer('C_PLAYER_LOCATION', 5, Object.assign({}, location, {
                type: 2,
                time: location.time - locRealTime + Date.now() - 50
            }))
            dispatch.toServer('C_PLAYER_LOCATION', 5, Object.assign(location, {
                type: 7,
                time: location.time - locRealTime + Date.now() + 50
            }))
        }
    });
}
