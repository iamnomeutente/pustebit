enum RadioMessage {
    message1 = 49434
}
radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber < 2) {
        pins.digitalWritePin(DigitalPin.P1, receivedNumber)
        if (receivedNumber == 1) {
            basic.showString("ON")
        } else {
            basic.showString("OFF")
        }
    } else {
        led.setBrightness(maxBrightness)
        if (receivedNumber == stoppingAlarmID) {
            basic.showIcon(IconNames.Happy)
            StopAlarm()
        } else if (receivedNumber == startingAlarmID) {
            basic.showIcon(IconNames.Sad)
        } else if (receivedNumber == alarmActiveID) {
            alarmActive = 1
            basic.showIcon(IconNames.Yes)
            basic.clearScreen()
        } else if (receivedNumber == alarmInactiveID) {
            alarmActive = 0
            basic.showIcon(IconNames.No)
            basic.clearScreen()
        } else {
            basic.showIcon(IconNames.Confused)
        }
    }
})
function StartingAnimation () {
    basic.showLeds(`
        . . . . .
        . . . . .
        . . # . .
        . . . . .
        . . . . .
        `)
    basic.showLeds(`
        . . . . .
        . # . # .
        . . . . .
        . # . # .
        . . . . .
        `)
    basic.showLeds(`
        . # . . .
        . . . . #
        . . . . .
        # . . . .
        . . . # .
        `)
    basic.showLeds(`
        . . # . .
        . . . . .
        # . . . #
        . . . . .
        . . # . .
        `)
    basic.showLeds(`
        . . . # .
        # . . . .
        . . . . .
        . . . . #
        . # . . .
        `)
    basic.showLeds(`
        # . . . #
        . . . . .
        . . . . .
        . . . . .
        # . . . #
        `)
    basic.clearScreen()
}
function SendOFFAnimation () {
    basic.showLeds(`
        # # # # #
        # . . . #
        # . . . #
        # . . . #
        # # # # #
        `)
    basic.showLeds(`
        . . . . .
        . # # # .
        . # . # .
        . # # # .
        . . . . .
        `)
    basic.showLeds(`
        . . . . .
        . . . . .
        . . # . .
        . . . . .
        . . . . .
        `)
    basic.clearScreen()
}
input.onButtonPressed(Button.A, function () {
    radio.sendNumber(1)
    SendONAnimation()
})
function StartAlarm () {
    movementDetected = 1
    radio.sendNumber(startingAlarmID)
    led.setBrightness(maxBrightness)
    music.setVolume(maxVolume)
    while (movementDetected) {
        music.playSoundEffect(music.builtinSoundEffect(soundExpression.sad), SoundExpressionPlayMode.UntilDone)
        game.addScore(1)
    }
}
input.onButtonPressed(Button.AB, function () {
    if (input.isGesture(Gesture.LogoDown)) {
        radio.sendNumber(stoppingAlarmID)
        basic.clearScreen()
    } else if (input.isGesture(Gesture.TiltLeft)) {
        radio.sendNumber(alarmActiveID)
    } else if (input.isGesture(Gesture.TiltRight)) {
        radio.sendNumber(alarmInactiveID)
    }
})
input.onButtonPressed(Button.B, function () {
    radio.sendNumber(0)
    SendOFFAnimation()
})
function Init () {
    radio.setGroup(23)
    defaultBrightness = 26
    movementDetected = 0
    maxVolume = 255
    maxBrightness = 255
    alarmActive = 1
    alarmActiveID = 21
    alarmInactiveID = 20
    startingAlarmID = 11
    stoppingAlarmID = 10
}
function StopAlarm () {
    movementDetected = 0
    music.stopAllSounds()
    led.setBrightness(defaultBrightness)
    basic.clearScreen()
}
function SendONAnimation () {
    basic.showLeds(`
        . . . . .
        . . . . .
        . . # . .
        . . . . .
        . . . . .
        `)
    basic.showLeds(`
        . . . . .
        . # # # .
        . # . # .
        . # # # .
        . . . . .
        `)
    basic.showLeds(`
        # # # # #
        # . . . #
        # . . . #
        # . . . #
        # # # # #
        `)
    basic.clearScreen()
}
let maxVolume = 0
let movementDetected = 0
let alarmActive = 0
let alarmInactiveID = 0
let alarmActiveID = 0
let startingAlarmID = 0
let stoppingAlarmID = 0
let maxBrightness = 0
let defaultBrightness = 0
Init()
pins.digitalWritePin(DigitalPin.P1, 0)
led.setBrightness(defaultBrightness)
StartingAnimation()
basic.forever(function () {
    if (alarmActive) {
        if (input.acceleration(Dimension.Y) >= 1800 || input.acceleration(Dimension.X) >= 1800) {
            StartAlarm()
        }
    }
})
