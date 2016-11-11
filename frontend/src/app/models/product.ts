export class Product {
    constructor(
        public id: number,
        public title: string,
        public brand: string,
        public category: string,
        public price: number,
        public date: number,
        public image: string,
        public description: string,
        public details: Array<string>
    ) { }
}
