enum ActionKind {
    Walking,
    Idle,
    Jumping
}
namespace SpriteKind {
    export const SnakeHead = SpriteKind.create()
    export const SnakeBody = SpriteKind.create()
    export const Elixir = SpriteKind.create()
}
function animateElixir () {
    animation.runMovementAnimation(
    elixir,
    animation.animationPresets(animation.bobbing),
    500,
    false
    )
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    animateUpMove()
    moveUp()
})
function moveRight () {
    moveSnakeBodySprite()
    snakeHead.setPosition(snakeHeadXBeforeMove + snakeSize, snakeHeadYBeforeMove)
}
function lenghtenSnake () {
    if (list.length >= 2) {
        lastBodySprite = list[list.length - 1]
        secondLastBodySprite = list[list.length - 2]
        dx = lastBodySprite.x - secondLastBodySprite.x
        dy = lastBodySprite.y - secondLastBodySprite.y
        X = lastBodySprite.x + dx
        Y = lastBodySprite.y + dy
        connectBodyParts(X, Y)
    }
}
function moveUp () {
    moveSnakeBodySprite()
    snakeHead.setPosition(snakeHeadXBeforeMove, snakeHeadYBeforeMove - snakeSize)
}
function moveSnakeBodySprite () {
    snakeHeadXBeforeMove = snakeHead.x
    snakeHeadYBeforeMove = snakeHead.y
    if (list.length > 0) {
        list.insertAt(0, list.pop())
        list[0].setPosition(snakeHead.x, snakeHead.y)
        console.log(list)
    }
}
controller.up.onEvent(ControllerButtonEvent.Repeated, function () {
    moveUp()
    animateUpMove()
})
sprites.onOverlap(SpriteKind.SnakeHead, SpriteKind.Food, function (sprite, otherSprite) {
    let score = 0
    info.changeScoreBy(1)
    console.logValue("score", score)
    if (otherSprite == apple) {
        apple.startEffect(effects.spray)
        pause(100)
        effects.clearParticles(apple)
        apple.setPosition(randint(20, 140), randint(20, 90))
        animateApple()
        lenghtenSnake()
        console.logValue("snakeLenght", list.length)
    } else if (otherSprite == raspberry) {
        raspberry.startEffect(effects.spray)
        pause(100)
        effects.clearParticles(raspberry)
        raspberry.setPosition(randint(20, 140), randint(20, 90))
        animateRaspberry()
        lenghtenSnake()
        console.logValue("snakeLenght", list.length)
    } else if (otherSprite == banana) {
        banana.startEffect(effects.spray)
        pause(100)
        effects.clearParticles(banana)
        banana.setPosition(randint(20, 140), randint(20, 90))
        animateBanana()
        lenghtenSnake()
        console.logValue("snakeLenght", list.length)
    }
})
controller.right.onEvent(ControllerButtonEvent.Repeated, function () {
    moveRight()
    animateRightMove()
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    moveLeft()
    animateLeftMove()
})
function animateRightMove () {
    snakeHeadAnimation = animation.createAnimation(ActionKind.Walking, 1000)
    animation.attachAnimation(snakeHead, snakeHeadAnimation)
    snakeHeadAnimation.addAnimationFrame(assets.image`snakeHeadRight`)
    animation.setAction(snakeHead, ActionKind.Walking)
}
function connectBodyParts (x: number, y: number) {
    bodyPart = sprites.create(sankeBodyImage, SpriteKind.SnakeBody)
    bodyPart.setPosition(x, y)
    list.push(bodyPart)
    console.logValue("x", list.length)
}
function animateDownMove () {
    snakeHeadAnimation = animation.createAnimation(ActionKind.Walking, 1000)
    animation.attachAnimation(snakeHead, snakeHeadAnimation)
    snakeHeadAnimation.addAnimationFrame(assets.image`snakeHeadDown`)
    animation.setAction(snakeHead, ActionKind.Walking)
}
function moveDown () {
    moveSnakeBodySprite()
    snakeHead.setPosition(snakeHeadXBeforeMove, snakeHeadYBeforeMove + snakeSize)
}
function animateApple () {
    animation.runMovementAnimation(
    apple,
    animation.animationPresets(animation.bobbing),
    500,
    false
    )
}
function animateUpMove () {
    snakeHeadAnimation = animation.createAnimation(ActionKind.Walking, 1000)
    animation.attachAnimation(snakeHead, snakeHeadAnimation)
    snakeHeadAnimation.addAnimationFrame(assets.image`snakeHeadUp`)
    animation.setAction(snakeHead, ActionKind.Walking)
}
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    moveRight()
    animateRightMove()
})
controller.down.onEvent(ControllerButtonEvent.Repeated, function () {
    moveDown()
    animateDownMove()
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    moveDown()
    animateDownMove()
})
info.onLifeZero(function () {
    game.gameOver(false)
})
function animateLeftMove () {
    snakeHeadAnimation = animation.createAnimation(ActionKind.Walking, 1000)
    animation.attachAnimation(snakeHead, snakeHeadAnimation)
    snakeHeadAnimation.addAnimationFrame(assets.image`snakeHeadLeft`)
    animation.setAction(snakeHead, ActionKind.Walking)
}
sprites.onOverlap(SpriteKind.SnakeHead, SpriteKind.SnakeBody, function (sprite, otherSprite) {
    pause(100)
    info.changeLifeBy(-1)
})
function setSnakeHead () {
    snakeHeadImage = image.create(snakeSize, snakeSize)
    snakeHeadImage = assets.image`snakeHeadUp`
    snakeHead = sprites.create(snakeHeadImage, SpriteKind.SnakeHead)
    snakeHead.setStayInScreen(true)
}
function createSnakeBody () {
    sankeBodyImage = image.create(snakeSize, snakeSize)
    sankeBodyImage = assets.image`snakeBody`
    list = sprites.allOfKind(SpriteKind.SnakeBody)
    for (let index = 0; index <= 5; index++) {
        temp = index + 1
        connectBodyParts(snakeHead.x, snakeHead.y + temp * snakeSize)
    }
}
function moveLeft () {
    moveSnakeBodySprite()
    snakeHead.setPosition(snakeHeadXBeforeMove - snakeSize, snakeHeadYBeforeMove)
}
sprites.onOverlap(SpriteKind.SnakeHead, SpriteKind.Enemy, function (sprite, otherSprite) {
    pause(100)
    info.changeLifeBy(-1)
})
sprites.onOverlap(SpriteKind.SnakeHead, SpriteKind.Elixir, function (sprite, otherSprite) {
    elixir.startEffect(effects.spray)
    pause(100)
    effects.clearParticles(elixir)
    elixir.setPosition(randint(20, 90), randint(20, 90))
    animateElixir()
    info.changeLifeBy(1)
})
function animateBanana () {
    animation.runMovementAnimation(
    banana,
    animation.animationPresets(animation.bobbing),
    500,
    false
    )
}
controller.left.onEvent(ControllerButtonEvent.Repeated, function () {
    moveLeft()
    animateLeftMove()
})
function animateRaspberry () {
    animation.runMovementAnimation(
    raspberry,
    animation.animationPresets(animation.bobbing),
    500,
    false
    )
}
let temp = 0
let snakeHeadImage: Image = null
let sankeBodyImage: Image = null
let bodyPart: Sprite = null
let snakeHeadAnimation: animation.Animation = null
let Y = 0
let X = 0
let dy = 0
let dx = 0
let secondLastBodySprite: Sprite = null
let lastBodySprite: Sprite = null
let list: Sprite[] = []
let snakeHeadYBeforeMove = 0
let snakeHeadXBeforeMove = 0
let snakeHead: Sprite = null
let elixir: Sprite = null
let banana: Sprite = null
let raspberry: Sprite = null
let apple: Sprite = null
let snakeSize = 0
scene.setBackgroundImage(assets.image`background`)
snakeSize = 8
setSnakeHead()
createSnakeBody()
apple = sprites.create(assets.image`myImage`, SpriteKind.Food)
apple.setPosition(randint(20, 140), randint(20, 100))
animateApple()
raspberry = sprites.create(assets.image`myImage1`, SpriteKind.Food)
raspberry.setPosition(randint(20, 140), randint(20, 100))
animateRaspberry()
banana = sprites.create(assets.image`myImage0`, SpriteKind.Food)
banana.setPosition(randint(20, 140), randint(20, 100))
animateBanana()
let poison = sprites.create(assets.image`potion10`, SpriteKind.Enemy)
poison.setPosition(randint(20, 140), randint(20, 100))
elixir = sprites.create(assets.image`potion12`, SpriteKind.Elixir)
elixir.setPosition(randint(20, 140), randint(20, 100))
animateElixir()
info.setScore(0)
info.setLife(3)
game.onUpdateInterval(5000, function () {
    poison.setPosition(randint(20, 140), randint(20, 100))
})
