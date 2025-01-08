export class RestaurentData 
{
    id: any; //json server will handle the id automatically but here we are using it to increment the id with any type (it was number)
    name: string = '';
    address: string = '';
    email: string = '';
    services: string = '';
    mobile: number = 0;
}