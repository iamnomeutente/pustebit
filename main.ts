enum RadioMessage {
    message1 = 49434
}
radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber < 2) {
        pins.digitalWritePin(DigitalPin.P0, receivedNumber)
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
    alarmActive = 1
    radio.sendNumber(startingAlarmID)
    led.setBrightness(maxBrightness)
    music.setVolume(maxVolume)
    while (alarmActive) {
        music.playSoundEffect(music.builtinSoundEffect(soundExpression.sad), SoundExpressionPlayMode.UntilDone)
        basic.showLeds(`
            # . # . #
            . # . # .
            # . # . #
            . # . # .
            # . # . #
            `)
        basic.showLeds(`
            . # . # .
            # . # . #
            . # . # .
            # . # . #
            . # . # .
            `)
    }
}
input.onButtonPressed(Button.AB, function () {
    if (input.isGesture(Gesture.LogoDown)) {
        radio.sendNumber(stoppingAlarmID)
    }
})
input.onButtonPressed(Button.B, function () {
    radio.sendNumber(0)
    SendOFFAnimation()
})
input.onGesture(Gesture.Shake, function () {
    StartAlarm()
})
function Init () {
    radio.setGroup(23)
    defaultBrightness = 26
    alarmActive = 0
    maxVolume = 255
    maxBrightness = 255
    startingAlarmID = 11
    stoppingAlarmID = 10
}
function StopAlarm () {
    alarmActive = 0
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
let alarmActive = 0
let startingAlarmID = 0
let stoppingAlarmID = 0
let maxBrightness = 0
let defaultBrightness = 0
Init()
pins.digitalWritePin(DigitalPin.P0, 0)
led.setBrightness(defaultBrightness)
StartingAnimation()
basic.forever(function () {
	
})
