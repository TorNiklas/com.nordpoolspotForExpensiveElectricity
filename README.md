# Nordpool

Nordpool Elspot Prices for Athom Homey.

This is a fork of https://github.com/balmli/com.nordpoolspot. It fixes a bug that occurs when electricity prices are above 1 000currency/MWh.

## Flow cards 

### Device: Nordpool

#### Triggers

- Price changed
- Current price is at the lowest among the next [x] hours
- Current price is at the highest among the next [x] hours
- Current price is [x] percent below average of the next [y] hours
- Current price is [x] percent above average of the next [y] hours

#### Conditions
- Current price below/above

### Release Notes

#### 0.2.1
- Default currency is now NOK
- Changed the shown price to be per kWh instead of MWh

#### 0.2.0
- Now works for prices above 1 000currency/MWh

#### 0.1.0
- Blank "starting hour" means 00:00 for "Low price [x] of the [y] hours starting at [z] hours today" - trigger

#### 0.0.1
- Initial version