aa = {"clientNumber":"1001065104","clientKey":"F0FD22D129F51A7E2882E9B2AE280A2095DDCD53","create_order_url":"http://ws.dpd.ru/services/order2?wsdl","create_label_url":"http://ws.dpd.ru/services/label-print?wsdl","Label.A4":"俄全通面单模板","Label.Small":"俄全通面单模板","terminalCode":"M16","senderName":"SD Экспресс","senderCountryName":"Россия","senderRegion":"Москва","senderCity":"Москва","senderStreet":"Дзержинский, Садовая улица, 6","senderPhone":"79775647702","receiverCountryName":"Россия","serviceCode":"ECN","serviceVariant":"ДД","pickingPlan":"2299","pickingCalendar":"3,6"}
ks = Object.keys(aa)
ks.forEach(k => {
    // param.put("clientNumber", "1001065104");
    console.log(`param.put("${k}", "${aa[k]}");`)
    // console.log(k, aa[k])
})