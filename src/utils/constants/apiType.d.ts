declare type HttpResponse<T> = {
   statusCode: number,
   message: string,
   content: T,
   dateTime: string
}