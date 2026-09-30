# Saudi iPhone Deal Finder

A prompt-based ChatGPT skill for researching second-hand and refurbished iPhones in Saudi Arabia.

## What it does

- Searches Saudi-relevant marketplaces and retailers when browsing is available.
- Compares prices in SAR after fees, delivery, and likely repair costs.
- Scores deals for value, condition, warranty, seller trust, and transaction risk.
- Checks important iPhone issues: Activation Lock, IMEI, battery health, parts history, carrier compatibility, and return rights.
- Produces ranked listings, negotiation guidance, and a pre-payment inspection checklist.

## Install/use

Copy the contents of [`SKILL.md`](SKILL.md) into a ChatGPT custom instruction, custom GPT instruction, or skill configuration. Then ask for a deal, for example:

> Find me the best used iPhone 13 or 14, 256GB, under 2,000 SAR in Riyadh. Minimum 85% battery health, Saudi-wide options are okay, and compare private sellers with refurbished retailers.

## Important limitation

The skill must not invent current listings or prices. It works best when the ChatGPT environment has web browsing or when the user supplies listing links. Availability, condition, seller claims, warranty, and prices must be checked at the time of purchase.

## Suggested user inputs

- Budget in SAR
- Model and storage
- City or delivery preference
- Minimum battery health
- New, refurbished, or private second-hand
- Warranty/return requirements
- Whether imported models are acceptable
