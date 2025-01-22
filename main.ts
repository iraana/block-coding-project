controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    mySprite.setImage(assets.image`forestSnake1`)
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    mySprite.setImage(assets.image`forestSnake2`)
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    mySprite.setImage(assets.image`forestSnake0`)
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    mySprite.setImage(assets.image`forestSnake4`)
})
let mySprite: Sprite = null
info.setScore(0)
mySprite = sprites.create(assets.image`forestSnake2`, SpriteKind.Player)
controller.moveSprite(mySprite, 10, 10)
scene.setBackgroundImage(assets.image`jfgjfjg`)
game.onUpdateInterval(500, function () {
    if (true) {
    	
    }
})
