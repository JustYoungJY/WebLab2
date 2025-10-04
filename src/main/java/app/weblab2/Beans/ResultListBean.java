package app.weblab2.Beans;

import java.util.ArrayList;
import java.util.List;

public class ResultListBean {

    private List<ResultBean> results;

    public ResultListBean() {
        this.results = new ArrayList<ResultBean>();
    }

    public List<ResultBean> getResults() {
        return results;
    }

    public void setResults(List<ResultBean> results) {
        this.results = results;
    }

    public void addResult(ResultBean result) {
        this.results.add(0, result);
    }
}
