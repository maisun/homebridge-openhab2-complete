'use strict';

const {Accessory} = require('../util/Accessory');
const {addSwingModeCharacteristic, addActiveCharacteristic} = require('./characteristic/Binary');
const {
    addRotationSpeedCharacteristic,
    addCurrentTemperatureCharacteristic,
    addHeatingThresholdCharacteristic,
    addCoolingThresholdCharacteristic,
    addTemperatureDisplayUnitsCharacteristic
} = require('./characteristic/Climate');
const {
    addCurrentHeaterCoolerStateCharacteristic,
    addTargetHeaterCoolerStateCharacteristic
} = require('./characteristic/ClimateHeaterCooler');

class HeaterCoolerAccessory extends Accessory {
    constructor(platform, config) {
        super(platform, config);
        this._services.unshift(this._getAccessoryInformationService('Heater/Cooler'));
        this._services.push(this._getPrimaryService(config));
    }

    _getPrimaryService(config) {
        this._log.debug(`Creating Heater/Cooler service for ${this.name}`);
        let primaryService = new this.Service.HeaterCooler(this.name);
         primaryService.getCharacteristic(this.Characteristic.HeatingThresholdTemperature).setProps({
                    maxValue: config.maxTemp,
                    minValue: config.minTemp,
                    minStep: config.minStep
                });
                primaryService.getCharacteristic(this.Characteristic.CoolingThresholdTemperature).setProps({
                         maxValue: config.maxTemp,
                         minValue: config.minTemp,
                         minStep: config.minStep
                });
                primaryService.getCharacteristic(this.Characteristic.Active).setProps({
                    maxValue: 1,
                    minValue: 1,
                    validValues: [1]
                });
                primaryService.getCharacteristic(this.Characteristic.RotationSpeed).setProps({
                    maxValue: config.maxFan,
                    minValue: config.minFan,
                    minStep: config.minFanStep
                });
        addCurrentTemperatureCharacteristic.bind(this)(primaryService);
        addTargetHeaterCoolerStateCharacteristic.bind(this)(primaryService);
        addCurrentHeaterCoolerStateCharacteristic.bind(this)(primaryService);
        addActiveCharacteristic.bind(this)(primaryService);
        addHeatingThresholdCharacteristic.bind(this)(primaryService, true);
        addCoolingThresholdCharacteristic.bind(this)(primaryService, true);
        addRotationSpeedCharacteristic.bind(this)(primaryService, true);
        addSwingModeCharacteristic.bind(this)(primaryService, true);
        addTemperatureDisplayUnitsCharacteristic.bind(this)(primaryService, true);
        return primaryService;
    }
}

const type = "heatercooler";

function createAccessory(platform, config) {
    return new HeaterCoolerAccessory(platform, config);
}

module.exports = {createAccessory, type};

