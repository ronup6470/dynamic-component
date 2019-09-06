/** model class for Dynamic */
export class Dynamic {

}
/**
 * User info
 */
export class UserInfo {
    /**
     * Name  of user info
     */
    public name: string;
    /**
     * Address  of user info
     */
    public address: string;
    /**
     * City  of user info
     */
    public city: string;
    /**
     * Number  of user info
     */
    public number: number;

}

export class City {
    id: number;
    name: string;
}
export class Office {
    id: number;
    officeName: string;
}
/** model class for Customer */
export class Customer {
    /** id  of Customer */
    public id: number;
    /** firstName  of Customer */
    public firstName: string;
    /** company  of Customer */
    public company: string;
    /** group  of Customer */
    public group: string;
    /** createdAt  of Customer */
    public createdAt: Date;
    /** email  of Customer */
    public email: string;
    /** productNo  of Customer */
    public productNo: string;
    /** image  of Customer */
    public image: string;
    isChecked: boolean;

    constructor(
        id?: number,
        firstName?: string,
        company?: string,
        group?: string,
        createdAt?: Date,
        email?: string,
        productNo?: string,
        image?: string,
    ) {
        this.id = id;
        this.firstName = firstName;
        this.company = company;
        this.group = group;
        this.createdAt = createdAt;
        this.email = email;
        this.productNo = productNo;
        this.image = image;
        this.isChecked = false;
    }
}