package com.bankapi.api.controller;

import com.bankapi.api.IExchangeClient;
import com.bankapi.api.model.Person;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

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
    public ArrayList getRates() {
        ArrayList rates = exchangeClient.getRates("","",5);
        return rates;
    }

    @RequestMapping(value = { "/personList" }, method = RequestMethod.GET)
    public String viewPersonList(Model model) {

        model.addAttribute("persons", persons);

        return "personList";
    }
}