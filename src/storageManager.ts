import { storageLS } from './storageLS'
import { storageDB } from './storageDB'

export const getStorage = (type) => {
	return type === 'LC' ? storageLS : storageDB;
}
