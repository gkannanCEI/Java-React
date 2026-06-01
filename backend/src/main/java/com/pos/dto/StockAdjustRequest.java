package com.pos.dto;

public class StockAdjustRequest {
    private int delta;

    public StockAdjustRequest() {}

    public StockAdjustRequest(int delta) {
        this.delta = delta;
    }

    public int getDelta() { return delta; }
    public void setDelta(int delta) { this.delta = delta; }
}
