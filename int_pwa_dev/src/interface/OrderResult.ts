

export interface BillingAddress {
    _type: string;
    address1: string;
    city: string;
    countryCode: string;
    firstName: string;
    fullName: string;
    id: string;
    lastName: string;
    phone: string;
    postalCode: string;
    stateCode: string;
}

export interface CustomerInfo {
    _type: string;
    customerId: string;
    customerName: string;
    email: string;
}

export interface Notes {
    _type: string;
    link: string;
}

export interface PaymentCard {
    _type: string;
    cardType: string;
    creditCardExpired: boolean;
    maskedNumber: string;
    numberLastDigits: string;
}

export interface PaymentInstrument {
    _type: string;
    amount: number;
    paymentCard: PaymentCard;
    paymentInstrumentId: string;
    paymentMethodId: string;
}

export interface AppliedDiscount {
    _type: string;
    amount: number;
    type: string;
}

export interface PriceAdjustment {
    _type: string;
    appliedDiscount: AppliedDiscount;
    creationDate: Date;
    custom: boolean;
    itemText: string;
    lastModified: Date;
    manual: boolean;
    price: number;
    priceAdjustmentId: string;
    promotionId: string;
    promotionLink: string;
}

export interface ProductItem {
    _type: string;
    adjustedTax: number;
    basePrice: number;
    bonusProductLineItem: boolean;
    gift: boolean;
    itemId: string;
    itemText: string;
    price: number;
    priceAdjustments: PriceAdjustment[];
    priceAfterItemDiscount: number;
    priceAfterOrderDiscount: number;
    productId: string;
    productName: string;
    quantity: number;
    shipmentId: string;
    tax: number;
    taxBasis: number;
    taxClassId: string;
    taxRate: number;
}

export interface ShippingAddress {
    _type: string;
    address1: string;
    city: string;
    countryCode: string;
    firstName: string;
    fullName: string;
    id: string;
    lastName: string;
    phone: string;
    postalCode: string;
    stateCode: string;
}

export interface ShippingMethod {
    _type: string;
    description: string;
    id: string;
    name: string;
    price: number;
    c_estimatedArrivalTime: string;
}

export interface Shipment {
    _type: string;
    adjustedMerchandizeTotalTax: number;
    adjustedShippingTotalTax: number;
    gift: boolean;
    merchandizeTotalTax: number;
    productSubTotal: number;
    productTotal: number;
    shipmentId: string;
    shipmentTotal: number;
    shippingAddress: ShippingAddress;
    shippingMethod: ShippingMethod;
    shippingStatus: string;
    shippingTotal: number;
    shippingTotalTax: number;
    taxTotal: number;
}

export interface ShippingItem {
    _type: string;
    adjustedTax: number;
    basePrice: number;
    itemId: string;
    itemText: string;
    price: number;
    priceAfterItemDiscount: number;
    shipmentId: string;
    tax: number;
    taxBasis: number;
    taxClassId: string;
    taxRate: number;
}

export interface OrderResult {
    _v: string;
    _type: string;
    _resource_state: string;
    adjustedMerchandizeTotalTax: number;
    adjustedShippingTotalTax: number;
    billingAddress: BillingAddress;
    channelType: string;
    confirmationStatus: string;
    createdBy: string;
    creationDate: Date;
    currency: string;
    customerInfo: CustomerInfo;
    customerName: string;
    exportStatus: string;
    lastModified: Date;
    merchandizeTotalTax: number;
    notes: Notes;
    orderNo: string;
    orderToken: string;
    orderTotal: number;
    paymentInstruments: PaymentInstrument[];
    paymentStatus: string;
    productItems: ProductItem[];
    productSubTotal: number;
    productTotal: number;
    shipments: Shipment[];
    shippingItems: ShippingItem[];
    shippingStatus: string;
    shippingTotal: number;
    shippingTotalTax: number;
    siteId: string;
    status: string;
    taxation: string;
    taxTotal: number;
}
