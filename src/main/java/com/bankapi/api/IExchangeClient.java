package com.bankapi.api;

import org.apache.catalina.Store;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.ArrayList;

@FeignClient(name="exchangeClient", url="https://api.privatbank.ua/p24api")
public interface IExchangeClient {
    @RequestMapping(method = RequestMethod.GET, value = "/pubinfo")
    ArrayList getRates(@PathVariable("json") String json,
                       @PathVariable("exchange") String exchange,
                       @PathVariable("coursid") int coursid);
}
