package com.bankapi.api.model;

import java.math.BigDecimal;

public class Rates {

    private String ccy;
    private String base_ccy;
    private BigDecimal buy;
    private BigDecimal sale;

    public String getCcy() {
        return ccy;
    }

    public void setCcy(String ccy) {
        this.ccy = ccy;
    }

    public String getBase_ccy() {
        return base_ccy;
    }

    public void setBase_ccy(String base_ccy) {
        this.base_ccy = base_ccy;
    }

    public BigDecimal getBuy() {
        return buy;
    }

    public void setBuy(BigDecimal buy) {
        this.buy = buy;
    }

    public BigDecimal getSale() {
        return sale;
    }

    public void setSale(BigDecimal sale) {
        this.sale = sale;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Rates rates = (Rates) o;

        if (ccy != null ? !ccy.equals(rates.ccy) : rates.ccy != null) return false;
        if (base_ccy != null ? !base_ccy.equals(rates.base_ccy) : rates.base_ccy != null) return false;
        if (buy != null ? !buy.equals(rates.buy) : rates.buy != null) return false;
        return sale != null ? sale.equals(rates.sale) : rates.sale == null;
    }

    @Override
    public int hashCode() {
        int result = ccy != null ? ccy.hashCode() : 0;
        result = 31 * result + (base_ccy != null ? base_ccy.hashCode() : 0);
        result = 31 * result + (buy != null ? buy.hashCode() : 0);
        result = 31 * result + (sale != null ? sale.hashCode() : 0);
        return result;
    }
}
