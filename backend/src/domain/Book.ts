import Order from './Order';

export default class Book {
	buys: Order[] = [];
	sells: Order[] = [];

	constructor(readonly marketId: string) {}

	insert(order: Order) {
		if (order.side === 'buy') {
			this.buys.push(order);
			this.buys.sort((a, b) => b.price - a.price);
		}
		if (order.side === 'sell') {
			this.sells.push(order);
			this.sells.sort((a, b) => a.price - b.price);
		}
		this.execute();
	}

	execute() {
		while (true) {
			const highestBuy = this.buys[0];
			const lowestSell = this.sells[0];

			if (!highestBuy || !lowestSell || highestBuy.price < lowestSell.price)
				break;

			const fillQuantity = Math.min(
				highestBuy.getAvailableQuantity(),
				lowestSell.getAvailableQuantity(),
			);
			const fillPrice =
				highestBuy.timestamp.getTime() > lowestSell.getAvailableQuantity()
					? lowestSell.price
					: highestBuy.price;
			highestBuy.fill(fillQuantity, fillPrice);
			lowestSell.fill(fillQuantity, fillPrice);

			if (highestBuy.status === 'closed')
				this.buys.splice(this.buys.indexOf(highestBuy), 1);

			if (lowestSell.status === 'closed')
				this.sells.splice(this.sells.indexOf(lowestSell), 1);

			// await this.orderRepository.update(highestBuy);
			// await this.orderRepository.update(lowestSell);
		}
	}
}
