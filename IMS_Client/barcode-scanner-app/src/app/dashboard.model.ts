export interface User{
    id:number;
    employeeUniqueId:string;
    userName:string;
    email:string;
    phoneNumber:string;
    departmentName:string;
    designation:string;
    barcode:string;
    attendances:Attendence[];

}
export interface Attendence{
    id:Number;
    checkInDate:Date;
    checkOutDate:Date;
}
