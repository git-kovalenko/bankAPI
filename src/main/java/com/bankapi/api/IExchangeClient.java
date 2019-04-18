package com.bankapi.api;

import com.bankapi.api.model.Rates;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.ArrayList;

//https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5

@FeignClient(name="exchangeClient", url="https://api.privatbank.ua/p24api", configuration = FeignLogConfiguration.class)
public interface IExchangeClient {
    @RequestMapping(method = RequestMethod.GET, value = "/pubinfo")
    ArrayList<Rates> getRates(@RequestParam("json") String json,
                              @RequestParam("exchange") String exchange,
                              @RequestParam("coursid") Integer coursid);


}
