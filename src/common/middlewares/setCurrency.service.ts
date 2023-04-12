import { Injectable, Logger } from '@nestjs/common'
import { Cron } from '@nestjs/schedule'
import axios from 'axios'
import * as moment from 'moment'

let arrCurrency

@Injectable()
export class SetCurrencyService {
  private readonly logger = new Logger(SetCurrencyService.name)
  
  getCurrency() {
    axios.get('https://s3.amazonaws.com/dolartoday/data.json')
      .then((response) => {
        const currency = response.data
        console.log(`Currency: ${moment().format('DD/MM/YYYY HH:mm:ss a')}`)
        arrCurrency = currency
      })
      .catch((error) => {
        this.logger.error(error)
      })
  } 
  /* 
        * * * * * *
        | | | | | |
        | | | | | day of week
        | | | | month
        | | | day of month
        | | hour
        | minute
        second (optional)
  */
  @Cron('* * 6 * * *', {
    name: 'setCurrency',
    timeZone: 'America/Caracas'
  })
  handleCron() {
    // this.getCurrency()
  }
}