import { Injectable } from '@nestjs/common'

type Data = {
  message: string
}

const data: Data = {
  message: 'CDA - NestJS GraphQL'
}

@Injectable()

export class AppService {
  getHello(): any {
    return data
  }
}
