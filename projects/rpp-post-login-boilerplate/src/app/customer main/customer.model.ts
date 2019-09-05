
/**
 * @author Ronak Patel.
 * @description
 */



/** Model for customer */
export class CustomerList {
    id: number;
    firstName: string;
    company: string;
    group: string;
    constructor(
        id?: number,
        firstName?: string,
        company?: string,
        group?: string,

    ) {
        this.id = id;
        this.firstName = firstName;
        this.company = company;
        this.group = group;

    }
}
/** Model for customer */
export class Customer extends CustomerList {
    createdAt: Date;
    email: string;
    productNo: string;
    image: File;
    isChecked: boolean;
    constructor(
        createdAt?: Date,
        email?: string,
        productNo?: string,
        image?: File,
        id?: number,
        firstName?: string,
        company?: string,
        group?: string,
    ) {
        super(id, firstName, company, group);
        this.createdAt = createdAt;
        this.email = email;
        this.productNo = productNo;
        this.image = image;
        this.isChecked = false;
    }
}

