# Homebridge Plugin for OpenHAB2 - Complete Edition
> Exceeding features of [homebridge-openhab2](https://www.npmjs.com/package/homebridge-openhab2) and [openHAB's Homekit Plugin](https://www.openhab.org/addons/integrations/homekit/) since `v.0.3.0`

[![NPM](https://nodei.co/npm/homebridge-openhab2-complete.png)](https://nodei.co/npm/homebridge-openhab2-complete/)

This [homebridge](https://github.com/nfarina/homebridge) plugin for [openHAB](https://www.openhab.org) has the expectation to fully support all Services offered by Apple's Homekit Accessory Protocol (HAP), as far as it is feasible based on the Item types offered by OpenHAB (see [below](#supported-hap-services) for the currently supported 21 accessories and `CHANGELOG.md` for my roadmap). In opposite to the existing [openHAB homebridge plugin](https://www.npmjs.com/package/homebridge-openhab2) or the native [openHAB Homekit Plugin](https://www.openhab.org/addons/integrations/homekit/) this plugin requires explicit declaration of accessories in the homebridge configuration and does not use openHAB's tagging system, which leads to a little more effort during configuration, but should prove more reliable and functional in more complex installations. See [Comparisson](#comparison) below.


## Installation
*Note: Please install [homebridge](https://www.npmjs.com/package/homebridge) first.*

```
npm install -g homebridge-openhab2-complete
```

## Configuration
This is a platform plugin, that will register all accessories within the Bridge provided by homebridge. The following shows the general homebridge configuration (`config.json`), see the [Supported HAP Services below](#supported-hap-services), in order to get the detailed configuration for each Service.

```
{
    "bridge": {
        ...
    },

    "accessories": [
        ...
    ],

    "platforms": [
        {
            "platform": "openHAB2-Complete",
            "host": "http://192.168.0.100",
            "port": "8080",
            "accessories": [
                {
                    "name": "An items name, as shown in Homekit later",
                    "type": "switch",
                    "item": "Itemname-within-OpenHAB"
                },
                ...
            ]
        },
        ...
    ]
}
```
* `platform` has to be `"openHAB2-Complete"`
* `host`: The IP or hostname of your openHAB instance. The Protocol specifier (`http://`) is optional, defaults to `http://` (independent of the port)
* `port`: Optional if not the default port of the protocol specified in `host`
* `accessory`: An array of accessories exposed to HomeKit, see the next chapter for available services and their configurations.

## Supported HAP Services
The following is a list of all Services that are currently supported and which values are required within the accessory configuration. Every accessory needs a `name` (as shown in HomeKit later) and a `type`. 

**Note: Due to the fact, that this is an early stage of development the configuration layout is not yet fixed and will change in the near future!**

* Complex Accessories:
  * [Lightbulb](#lightbulb)
  * [Thermostat](#thermostat)
  * [Security System](#security-system)
* Position Based Actors:
  * [Window Covering](#window-covering)
  * [Door](#door)
  * [Window](#window)
  * [Lock Mechanism](#lock-mechanism)
* Numeric Sensors:
  * [Temperature Sensor](#temperature-sensor)
  * [Humidity Sensor](#humidity-sensor)
  * [Light Sensor](#light-sensor)
* Binary Actors:
  * [Switch](#switch)
  * [Fan](#fan)
  * [Outlet](#outlet)
* Binary Sensors:
  * [Motion Sensor](#motion-sensor)
  * [Occupancy Sensor](#occupancy-sensor)
  * [Leak Sensor](#leak-sensor)
  * [Carbon Monoxide Sensor](#carbon-monoxide-sensor)
  * [Carbon Dioxide Sensor](#carbon-dioxide-sensor)
  * [Contact Sensor](#contact-sensor)
  * [Smoke Sensor](#smoke-sensor)
  * [Filter Maintenance Sensor](#filter-maintenance-sensor)
  
The following services will be implemented in the near future:
* Water Service Accessories
  * Valve
  * Faucet
  * Irrigation
* Climate Service Accessories
  * HeaterCooler
  * Humidifier/Dehumidifier
  * Air Purifier

The following services are also defined by the HomeKit protocol, but since I don't know a good way to map them to openHAB items, I currently don't plan to implement them. Let me know if you have any ideas, by opening an issue!
* Garage Door Opener
* Air Quality Sensor
* Slat
* Microphone
* Speaker
* Camera RTP Stream Management
* Doorbell
* Stateless Programmable Switch

### Switch
This service describes a binary switch.

```
{
    "name": "An items name, as shown in Homekit later",
    "type": "switch",
    "item": "Itemname-within-OpenHAB",
    "inverted": "false"
}
```
* `item`: The openHAB item controlled by this accessory
  * Needs to be of type `Switch` within openHAB
* `inverted` *(optional)*: If `item`'s state needs to be interpreted inverted, set this value to `"true"` 
  * Default: `"false"`
  * Allowed values: `"true"` & `"false"` *don't forget the quotes*

### Fan
This service describes a fan.

```
{
    "name": "An items name, as shown in Homekit later",
    "type": "fan",
    "item": "Itemname-within-OpenHAB",
    "inverted": "false"
}
```
* `item`: The openHAB item controlled by this accessory
  * Needs to be of type `Switch` within openHAB
* `inverted` *(optional)*: If `item`'s state needs to be interpreted inverted, set this value to `"true"` 
  * Default: `"false"`
  * Allowed values: `"true"` & `"false"` *don't forget the quotes*

### Outlet
This service describes an outlet.

```
{
    "name": "An items name, as shown in Homekit later",
    "type": "outlet",
    "item": "Itemname-within-OpenHAB",
    "inUseItem": "Itemname-within-OpenHAB",
    "inUseItemInverted": "false"
}
```
* `item`: The openHAB item controlled by this accessory
  * Needs to be of type `Switch` within openHAB
* `inverted` *(optional)*: If `item`'s state needs to be interpreted inverted, set this value to `"true"` 
  * Default: `"false"`
  * Allowed values: `"true"` & `"false"` *don't forget the quotes*
* `inUseItem` *(optional)*: Representing, if the outlet is currently in use (if `Switch` is `ON`, `Contact` is `OPEN` or `Number` is greater than 0)
  * Default: The state of `item` is used to show if the outlet is in use
  * Needs to be of type `Switch`, `Contact` or `Number` within openHAB
* `inUseItemInverted` *(optional)*: If `inUseItem`'s state needs to be interpreted inverted, set this value to `"true"` 
  * Default: `"false"`
  * Allowed values: `"true"` & `"false"` *don't forget the quotes*

### Lightbulb
This service describes a lightbulb.

```
{
    "name": "An items name, as shown in Homekit later",
    "type": "light",
    "item": "Itemname-within-OpenHAB"
}
```
* `item`: The openHAB item controlled by this accessory
  * Needs to be of type `Switch`, `Dimmer` or `Color` within openHAB (HomeKit will correctly display brightness (in case of `Dimmer` or `Color`) and color settings (in case of `Color`))

### Thermostat
This service describes a thermostat.

```
{
    "name": "An items name, as shown in Homekit later",
    "type": "thermostat",
    "currentTempItem": "Itemname-within-OpenHAB",
    "targetTempItem": "Itemname-within-OpenHAB",
    "currentHumidityItem": "Itemname-within-OpenHAB",
    "targetHumidityItem": "Itemname-within-OpenHAB",
    "heatingItem": "Itemname-within-OpenHAB",
    "coolingItem": "Itemname-within-OpenHAB",
    "tempUnit": "Celsius"
}
```
* `currentTempItem`: The openHAB item representing the current temperature as measured by the thermostat
  * Needs to be of type `Number` within openHAB
* `targetTempItem`: The openHAB item representing the target temperature inside the room
  * Needs to be of type `Number` within openHAB
* `currentHumidityItem` *(optional)*: The openHAB item representing the current humidity as measured by the thermostat
  * Needs to be of type `Number` within openHAB
* `targetHumidityItem` *(optional)*: The openHAB item representing the target humidity inside the room
  * Needs to be of type `Number` within openHAB
* `heatingItem` *(optional, if `coolingItem` is present, otherwise required)*: The openHAB item showing, if the room is currently being heated
  * Needs to be of type `Switch` or `Contact` within openHAB
* `coolingItem` *(optional, if `heatingItem` is present, otherwise required)*: The openHAB item showing, if the room is currently being cooled
  * Needs to be of type `Switch` or `Contact` within openHAB
* `tempUnit` *(optional)*: Gives the measurement unit of the thermostat
  * Default: `Celsius`
  * Allowed values: `Celsius` & `Fahrenheit`

### Window Covering
This service describes motorized window coverings or shades - examples include shutters, blinds, awnings etc.

```
{
    "name": "An items name, as shown in Homekit later",
    "type": "windowcovering", 
    "item": "Itemname-within-OpenHAB",
    "inverted": "false",
    "stateItem": "Itemname-within-OpenHAB",
    "stateItemInverted": "false"
}
```
* `item`: The openHAB item representing the window covering, receiving commands about the target position and determining the current position (if `stateItem` is not set)
  * Needs to be of type `Rollershutter`, `Number` or `Switch` within openHAB
* `inverted` *(optional)*: If `item`'s state needs to be interpreted inverted, set this value to `"true"` 
  * Default: `"false"`
  * Allowed values: `"true"` & `"false"` *don't forget the quotes*
* `stateItem` *(optional)*: The openHAB item, used to determine the state of the window covering instead of `item`'s state
  * Needs to be of type `Rollershutter`, `Number`, `Switch` or `Contact` within openHAB
* `stateItemInverted` *(optional)*: If `stateItem`'s state needs to be interpreted inverted, set this value to `"true"` 
  * Default: `"false"`
  * Allowed values: `"true"` & `"false"` *don't forget the quotes*

### Door 
This service describes a motorized door

```
{
    "name": "An items name, as shown in Homekit later",
    "type": "door", 
    "item": "Itemname-within-OpenHAB",
    "inverted": "false",
    "stateItem": "Itemname-within-OpenHAB",
    "stateItemInverted": "false"
}
```
* `item`: The openHAB item representing the door, receiving commands about the target position and determining the current position (if `stateItem` is not set)
  * Needs to be of type `Rollershutter`, `Number` or `Switch` within openHAB
* `inverted` *(optional)*: If `item`'s state needs to be interpreted inverted, set this value to `"true"` 
  * Default: `"false"`
  * Allowed values: `"true"` & `"false"` *don't forget the quotes*
* `stateItem` *(optional)*: The openHAB item, used to determine the state of the door instead of `item`'s state
  * Needs to be of type `Rollershutter`, `Number`, `Switch` or `Contact` within openHAB
* `stateItemInverted` *(optional)*: If `stateItem`'s state needs to be interpreted inverted, set this value to `"true"` 
  * Default: `"false"`
  * Allowed values: `"true"` & `"false"` *don't forget the quotes*

### Window
This service describes a motorized window

```
{
    "name": "An items name, as shown in Homekit later",
    "type": "door", 
    "item": "Itemname-within-OpenHAB",
    "inverted": "false",
    "stateItem": "Itemname-within-OpenHAB",
    "stateItemInverted": "false"
}
```
* `item`: The openHAB item representing the window, receiving commands about the target position and determining the current position (if `stateItem` is not set)
  * Needs to be of type `Rollershutter`, `Number` or `Switch` within openHAB
* `inverted` *(optional)*: If `item`'s state needs to be interpreted inverted, set this value to `"true"` 
  * Default: `"false"`
  * Allowed values: `"true"` & `"false"` *don't forget the quotes*
* `stateItem` *(optional)*: The openHAB item, used to determine the state of the window instead of `item`'s state
  * Needs to be of type `Rollershutter`, `Number`, `Switch` or `Contact` within openHAB
* `stateItemInverted` *(optional)*: If `stateItem`'s state needs to be interpreted inverted, set this value to `"true"` 
  * Default: `"false"`
  * Allowed values: `"true"` & `"false"` *don't forget the quotes*

### Lock Mechanism
The HomeKit Lock Mechanism Service is designed to expose and control the physical lock mechanism on a device.

```
{
    "name": "An items name, as shown in Homekit later",
    "type": "lock", 
    "item": "Itemname-within-OpenHAB",
    "inverted": "false",
    "stateItem": "Itemname-within-OpenHAB",
    "stateItemInverted": "false"
}
```
* `item`: The openHAB item representing the lock, receiving commands about the target position and determining the current position (if `stateItem` is not set)
  * Needs to be of type `Switch` within openHAB
* `inverted` *(optional)*: If `item`'s state needs to be interpreted inverted, set this value to `"true"` 
  * Default: `"false"`
  * Allowed values: `"true"` & `"false"` *don't forget the quotes*
* `stateItem` *(optional)*: The openHAB item, used to determine the state of the lock instead of `item`'s state
  * Needs to be of type `Rollershutter`, `Number`, `Switch` or `Contact` within openHAB
* `stateItemInverted` *(optional)*: If `stateItem`'s state needs to be interpreted inverted, set this value to `"true"` 
  * Default: `"false"`
  * Allowed values: `"true"` & `"false"` *don't forget the quotes*

### Security System
```
{
    "name": "An items name, as shown in Homekit later",
    "type": "security"
    "homeItem": "Itemname-within-OpenHAB",
    "homeItemInverted": "false",
    "awayItem": "Itemname-within-OpenHAB",
    "awayItemInverted": "false",
    "sleepItem": "Itemname-within-OpenHAB",
    "sleepItemInverted": "false",
    "alarmItem": "Itemname-within-OpenHAB",
    "alarmItemInverted": "false"
}
```
* `homeItem` *(optional)*: The openHAB item representing if the system is in home mode
  * Needs to be of type `Switch` within openHAB
* `homeItemInverted` *(optional)*: If `homeItem`'s state needs to be interpreted inverted, set this value to `"true"` 
  * Default: `"false"`
  * Allowed values: `"true"` & `"false"` *don't forget the quotes*
* `awayItem` *(optional)*: The openHAB item representing if the system is in away mode
  * Needs to be of type `Switch` within openHAB
* `awayItemInverted` *(optional)*: If `awayItem`'s state needs to be interpreted inverted, set this value to `"true"` 
  * Default: `"false"`
  * Allowed values: `"true"` & `"false"` *don't forget the quotes*
* `sleepItem` *(optional)*: The openHAB item representing if the system is in sleep mode
  * Needs to be of type `Switch` within openHAB
* `sleepItemInverted` *(optional)*: If `sleepItem`'s state needs to be interpreted inverted, set this value to `"true"` 
  * Default: `"false"`
  * Allowed values: `"true"` & `"false"` *don't forget the quotes*
* `alarmItem` *(optional)*: The openHAB item representing if the system is currently sounding an alarm
  * Needs to be of type `Switch` within openHAB
* `alarmItemInverted` *(optional)*: If `alarmItem`'s state needs to be interpreted inverted, set this value to `"true"` 
  * Default: `"false"`
  * Allowed values: `"true"` & `"false"` *don't forget the quotes*

Each item (`homeItem`, `awayItem`, `sleepItem`, `alarmItem`) is optional, only one of them needs to be defined. When switching between the states (`Home Armed`, `Away Armed`, `Sleep Armed` & `Off`) the respective item gets triggered and all other will be turned off. The state of the system is determined which item in the order `alarmItem` -> `homeItem` -> `awayItem` -> `sleepItem` is turned on, if all items are off the state is `OFF`

### Temperature Sensor
This service describes a temperature sensor.

```
{
    "name": "An items name, as shown in Homekit later",
    "type": "temp",
    "item": "Itemname-within-OpenHAB",
    "batteryItem": "Itemname-within-OpenHAB",
    "batteryItemInverted": "false"
}
```
* `item`: The openHAB item representing the current temperature
  * Needs to be of type `Number` within openHAB
* `batteryItem` *(optional)*: The openHAB item representing a battery warning for this accessory. If the item has the state `ON` or `OPEN` the battery warning will be triggered
  * Needs to be of type `Switch` or `Contact` within openHAB
* `batteryItemInverted` *(optional)*: If `batteryItem`'s state needs to be interpreted inverted, set this value to `"true"` 
  * Default: `"false"`
  * Allowed values: `"true"` & `"false"` *don't forget the quotes*

### Humidity Sensor
This service describes a humidity sensor.

```
{
    "name": "An items name, as shown in Homekit later",
    "type": "humidity",
    "item": "Itemname-within-OpenHAB",
    "batteryItem": "Itemname-within-OpenHAB",
    "batteryItemInverted": "false"
}
```
* `item`: The openHAB item representing the current humidity 
  * Needs to be of type `Number` within openHAB
* `batteryItem` *(optional)*: The openHAB item representing a battery warning for this accessory. If the item has the state `ON` or `OPEN` the battery warning will be triggered
  * Needs to be of type `Switch` or `Contact` within openHAB
* `batteryItemInverted` *(optional)*: If `batteryItem`'s state needs to be interpreted inverted, set this value to `"true"` 
  * Default: `"false"`
  * Allowed values: `"true"` & `"false"` *don't forget the quotes*

### Light Sensor
This service describes a light sensor.

```
{
    "name": "An items name, as shown in Homekit later",
    "type": "lightSensor",
    "item": "Itemname-within-OpenHAB",
    "batteryItem": "Itemname-within-OpenHAB",
    "batteryItemInverted": "false"
}
```
* `item`: The openHAB item representing the current light in lux 
  * Needs to be of type `Number` within openHAB
* `batteryItem` *(optional)*: The openHAB item representing a battery warning for this accessory. If the item has the state `ON` or `OPEN` the battery warning will be triggered
  * Needs to be of type `Switch` or `Contact` within openHAB
* `batteryItemInverted` *(optional)*: If `batteryItem`'s state needs to be interpreted inverted, set this value to `"true"` 
  * Default: `"false"`
  * Allowed values: `"true"` & `"false"` *don't forget the quotes*

### Motion Sensor
This service describes a motion sensor.

```
{
    "name": "An items name, as shown in Homekit later",
    "type": "motion",
    "item": "Itemname-within-OpenHAB",
    "inverted": "true",
    "batteryItem": "Itemname-within-OpenHAB",
    "batteryItemInverted": "false"
}
```
* `item`: The openHAB item showing, if motion is detected
  * Needs to be of type `Switch` or `Contact` within openHAB
* `inverted` *(optional)*: If `item`'s state needs to be interpreted inverted, set this value to `"true"` 
  * Default: `"false"`
  * Allowed values: `"true"` & `"false"` *don't forget the quotes*
* `batteryItem` *(optional)*: The openHAB item representing a battery warning for this accessory. If the item has the state `ON` or `OPEN` the battery warning will be triggered
  * Needs to be of type `Switch` or `Contact` within openHAB
* `batteryItemInverted` *(optional)*: If `batteryItem`'s state needs to be interpreted inverted, set this value to `"true"` 
  * Default: `"false"`
  * Allowed values: `"true"` & `"false"` *don't forget the quotes*

### Occupancy Sensor
This service describes an occupancy sensor.

```
{
    "name": "An items name, as shown in Homekit later",
    "type": "occupancy",
    "item": "Itemname-within-OpenHAB",
    "inverted": "true",
    "batteryItem": "Itemname-within-OpenHAB",
    "batteryItemInverted": "false"
}
```
* `item`: The openHAB item showing, if occupancy is detected
  * Needs to be of type `Switch` or `Contact` within openHAB
* `inverted` *(optional)*: If `item`'s state needs to be interpreted inverted, set this value to `"true"` 
  * Default: `"false"`
  * Allowed values: `"true"` & `"false"` *don't forget the quotes*
* `batteryItem` *(optional)*: The openHAB item representing a battery warning for this accessory. If the item has the state `ON` or `OPEN` the battery warning will be triggered
  * Needs to be of type `Switch` or `Contact` within openHAB
* `batteryItemInverted` *(optional)*: If `batteryItem`'s state needs to be interpreted inverted, set this value to `"true"` 
  * Default: `"false"`
  * Allowed values: `"true"` & `"false"` *don't forget the quotes*

### Leak Sensor
This service describes a leak sensor.

```
{
    "name": "An items name, as shown in Homekit later",
    "type": "motion",
    "item": "Itemname-within-OpenHAB",
    "inverted": "true",
    "batteryItem": "Itemname-within-OpenHAB",
    "batteryItemInverted": "false"
}
```
* `item`: The openHAB item showing, if a leak is detected
  * Needs to be of type `Switch` or `Contact` within openHAB
* `inverted` *(optional)*: If `item`'s state needs to be interpreted inverted, set this value to `"true"` 
  * Default: `"false"`
  * Allowed values: `"true"` & `"false"` *don't forget the quotes*
* `batteryItem` *(optional)*: The openHAB item representing a battery warning for this accessory. If the item has the state `ON` or `OPEN` the battery warning will be triggered
  * Needs to be of type `Switch` or `Contact` within openHAB
* `batteryItemInverted` *(optional)*: If `batteryItem`'s state needs to be interpreted inverted, set this value to `"true"` 
  * Default: `"false"`
  * Allowed values: `"true"` & `"false"` *don't forget the quotes*

### Carbon Monoxide Sensor
This service describes a carbon monoxide sensor.

```
{
    "name": "An items name, as shown in Homekit later",
    "type": "co",
    "item": "Itemname-within-OpenHAB",
    "inverted": "true",
    "levelItem": "Itemname-within-OpenHAB",
    "batteryItem": "Itemname-within-OpenHAB",
    "batteryItemInverted": "false"
}
```
* `item`: The openHAB item showing, if carbon monoxide is detected
  * Needs to be of type `Switch` or `Contact` within openHAB
* `inverted` *(optional)*: If `item`'s state needs to be interpreted inverted, set this value to `"true"` 
  * Default: `"false"`
  * Allowed values: `"true"` & `"false"` *don't forget the quotes*
* `levelItem` *(optional)*: The openHAB item representing the current carbon monoxide level, measured by the sensor
  * Needs to be of type `Number` within openHAB
* `batteryItem` *(optional)*: The openHAB item representing a battery warning for this accessory. If the item has the state `ON` or `OPEN` the battery warning will be triggered
  * Needs to be of type `Switch` or `Contact` within openHAB
* `batteryItemInverted` *(optional)*: If `batteryItem`'s state needs to be interpreted inverted, set this value to `"true"` 
  * Default: `"false"`
  * Allowed values: `"true"` & `"false"` *don't forget the quotes*

### Carbon Dioxide Sensor
This service describes a carbon dioxide sensor.

```
{
    "name": "An items name, as shown in Homekit later",
    "type": "co2",
    "item": "Itemname-within-OpenHAB",
    "inverted": "true",
    "levelItem": "Itemname-within-OpenHAB",
    "batteryItem": "Itemname-within-OpenHAB",
    "batteryItemInverted": "false"
}
```
* `item`: The openHAB item showing, if carbon dioxide is detected
  * Needs to be of type `Switch` or `Contact` within openHAB
* `inverted` *(optional)*: If `item`'s state needs to be interpreted inverted, set this value to `"true"` 
  * Default: `"false"`
  * Allowed values: `"true"` & `"false"` *don't forget the quotes*
* `levelItem` *(optional)*: The openHAB item representing the current carbon dioxide level, measured by the sensor
  * Needs to be of type `Number` within openHAB
* `batteryItem` *(optional)*: The openHAB item representing a battery warning for this accessory. If the item has the state `ON` or `OPEN` the battery warning will be triggered
  * Needs to be of type `Switch` or `Contact` within openHAB
* `batteryItemInverted` *(optional)*: If `batteryItem`'s state needs to be interpreted inverted, set this value to `"true"` 
  * Default: `"false"`
  * Allowed values: `"true"` & `"false"` *don't forget the quotes*

### Contact Sensor
This service describes a contact sensor.

```
{
    "name": "An items name, as shown in Homekit later",
    "type": "co2",
    "item": "Itemname-within-OpenHAB",
    "inverted": "true",
    "batteryItem": "Itemname-within-OpenHAB",
    "batteryItemInverted": "false",
}
```
* `item`: The openHAB item showing, if contact is detected
  * Needs to be of type `Switch` or `Contact` within openHAB
* `inverted` *(optional)*: If `item`'s state needs to be interpreted inverted, set this value to `"true"` 
  * Default: `"false"`
  * Allowed values: `"true"` & `"false"` *don't forget the quotes*
* `batteryItem` *(optional)*: The openHAB item representing a battery warning for this accessory. If the item has the state `ON` or `OPEN` the battery warning will be triggered
  * Needs to be of type `Switch` or `Contact` within openHAB
* `batteryItemInverted` *(optional)*: If `batteryItem`'s state needs to be interpreted inverted, set this value to `"true"` 
  * Default: `"false"`
  * Allowed values: `"true"` & `"false"` *don't forget the quotes*

### Smoke Sensor
This service describes a smoke sensor.

```
{
    "name": "An items name, as shown in Homekit later",
    "type": "smoke",
    "item": "Itemname-within-OpenHAB",
    "inverted": "true",
    "batteryItem": "Itemname-within-OpenHAB",
    "batteryItemInverted": "false",
}
```
* `item`: The openHAB item showing, if smoke is detected
  * Needs to be of type `Switch` or `Contact` within openHAB
* `inverted` *(optional)*: If `item`'s state needs to be interpreted inverted, set this value to `"true"` 
  * Default: `"false"`
  * Allowed values: `"true"` & `"false"` *don't forget the quotes*
* `batteryItem` *(optional)*: The openHAB item representing a battery warning for this accessory. If the item has the state `ON` or `OPEN` the battery warning will be triggered
  * Needs to be of type `Switch` or `Contact` within openHAB
* `batteryItemInverted` *(optional)*: If `batteryItem`'s state needs to be interpreted inverted, set this value to `"true"` 
  * Default: `"false"`
  * Allowed values: `"true"` & `"false"` *don't forget the quotes*

### Filter Maintenance Sensor
This service describes a filter maintenance sensor.

```
{
    "name": "An items name, as shown in Homekit later",
    "type": "filter",
    "item": "Itemname-within-OpenHAB",
    "inverted": "true",
    "levelItem": "Itemname-within-OpenHAB"
}
```
* `item`: The openHAB item showing, if filter maintenance is required 
  * Needs to be of type `Switch` or `Contact` within openHAB
* `inverted` *(optional)*: If `item`'s state needs to be interpreted inverted, set this value to `"true"` 
  * Default: `"false"`
  * Allowed values: `"true"` & `"false"` *don't forget the quotes*
* `levelItem` *(optional)*: The openHAB item representing the current filter level
  * Needs to be of type `Number` within openHAB

## Additional Services & Notes from the Developer
Obviously the aim of this project is a full coverage of the HAP specification. Due to the limitations of smart devices in my home I can only test a subset and would love to have your feedback and input for this project.

Due to the very limited documentation on homebridge plugin development I have not implemented a dynamic platform (there is only [this partly complete wiki entry](https://github.com/nfarina/homebridge/wiki/On-Programming-Dynamic-Platforms)). If anyone of you knows how to do it, please contact me directly!

If you have feedback or suggestions how to better represent the Services as openHAB Items, feel free to open an [issue](https://github.com/steilerDev/homebridge-openhab2-complete/issues).

If you would like to contribute just send me a pull request. In order to add a new service you have to modify/add the following parts:
1. Create your own accessory class within `./accessory`
2. The only *required* functions are `getServices()` (returning an array of `HAP.Service` with attached `HAP.Characteristic`) and `identify()` (which does not need to do anything). Those are implemented in the `Accessory` super class and don't need to be overridden. Make sure that `this._services` is populated and reflects your service
3. Define `const type = "YourTypeName"` (this will be used inside `config.json` to identify an accessory of your type) and `function createAccessory(platform, config)` returning an instance of your Accessory.
4. Finally expose `type` and `createAccessory` through `module.exports = {type, createAccessory}`
   
My accessories are using centrally defined characteristics inside `./accessory/characteristic`. See `NumericSensor.js` for a simple characteristic implementation and `TemperatureSensor.js` for a simple accessory using this characteristic. This is not a requirement, but highly recommended. 


## Comparision
| [homebridge-openhab2 plugin](https://www.npmjs.com/package/homebridge-openhab2) | openHAB2 - Complete Edition
--- | --- 
Verly little configuration within homebridge/openHAB, only tags within `*.items` files and inclusion within sitemap, obviously requiring both to be created manually | Explicit declaration within `config.json` not requiring instable openHAB `Metadata Provider` (removes items if state is `NULL`) and de-couples homebridge configuration from openHAB
Support only 1:1 mappings between Items and HomeKit Services | Supports composite items (e.g. Thermostat, Security System, Battery States, etc.)
Uses `SSE` to receive push notifications from openHAB about state change and requires sitemap definitions | Polling of states through REST interface & push notifications from openHAB through `SSE` *without*  the requirement of a sitemap
Thermostats never really worked | Thermostats working as expected
4 accessory types supported | 21 different accessory types supported
Light item in openHAB gets triggered multiple times from single user interaction | Light item in openHAB receives only one command per user interaction

Concluding, I personally would use the [OpenHAB homebridge plugin](https://www.npmjs.com/package/homebridge-openhab2) in smaller, less diverse installations. However my own installation has a magnitude of different devices, that I want to fully include in HomeKit, therefore this plugin is the only feasible way for me and everyone alike.