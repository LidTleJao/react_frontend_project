export interface ConcertDealsGetByUserRes {
    CDID:              number;
    user_ID:           number;
    ticket_ID:         number;
    name_concert:      string;
    province: string;
    type_ticket_ID:    number;
    name_type_ticket:  string;
    status_ID:         number;
    name_status:       string;
    number_of_tickets: number;
    concert_deal_price:             number;
    s_datetime:        Date;
    e_datetime:        Date;
}
