import { Logger } from 'homebridge';
import NodeCache from 'node-cache';
import SwitchBot, { AdvertisementData } from 'node-switchbot';
import {
	CACHE_TTL,
	CHECK_CACHE_TTL_PERIOD,
	DEFAULT_BATTERY_LEVEL,
} from '../settings';

export class MetadataClient {
	private log: Logger;
	private readonly client = new SwitchBot();

	private readonly metaDataCache = new NodeCache({
		stdTTL: CACHE_TTL,
		checkperiod: CHECK_CACHE_TTL_PERIOD,
		// We want to store a clone of the metadata, since
		// it is the recommended method of caching things using
		// node-cache
		useClones: true,
		deleteOnExpire: true,
	});

	private isScanningForMetadata = false;

	constructor(log: Logger) {
		this.log = log;
		this.client.onadvertisement = this.handleScannedMetadata;
	}

	public getDeviceBatteryStatus = (address: string, scanDuration: number) => {
		this.log.info(`Getting Battery level for device (address ${address})`);

		const metaData = this.getMetadataFromCache(address);
		if (!metaData && !this.isScanningForMetadata) {
			this.log.info(
				`No battery level details found for device (address ${address})`,
			);
			this.scanForDeviceMetadata(address, scanDuration);
		}

		return metaData?.serviceData?.battery ?? DEFAULT_BATTERY_LEVEL;
	};

	private scanForDeviceMetadata = async (
		address: string,
		scanDuration: number,
	) => {
		this.log.info('Scanning for device metadata');
		this.isScanningForMetadata = true;

		await this.client.startScan({ model: 'H' });
		await this.client.wait(scanDuration);
		this.client.stopScan();

		this.isScanningForMetadata = false;
		this.log.info(`Finished scanning for device metadata (address ${address})`);
	};

	private handleScannedMetadata = (data: AdvertisementData) => {
		const isAlreadyCached = this.metaDataCache.has(data.address);
		if (isAlreadyCached) {
			return;
		}

		this.log.info(
			`Found device metadata during scan. setting on cache. (address ${data.address})`,
		);
		this.metaDataCache.set(data.address, data);
	};

	private getMetadataFromCache = (address: string) => {
		const metaData = this.metaDataCache.get(address) as AdvertisementData;
		return metaData;
	};
}
