package com.bankapi.api.controller;

import com.bankapi.api.IExchangeClient;
import com.bankapi.api.model.Person;
import com.bankapi.api.model.Rates;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

@Controller
public class MainController {

    @Autowired
    private IExchangeClient exchangeClient;

    private static List<Person> persons = new ArrayList<Person>();
    static {
        persons.add(new Person("Bill", "Gates"));
        persons.add(new Person("Steve", "Jobs"));
    }

    @RequestMapping(value = { "/exchange" }, method = RequestMethod.GET)
    @ResponseBody
    public ArrayList<Rates> getRates() {
        return exchangeClient.getRates("","",5);
    }

    @RequestMapping(value = { "/personList" }, method = RequestMethod.GET)
    @ResponseBody
    public List<Person> viewPersonList(Model model) {
        return persons;
    }
}