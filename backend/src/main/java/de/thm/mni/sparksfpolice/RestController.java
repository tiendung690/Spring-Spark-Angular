package de.thm.mni.sparksfpolice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.QueryParam;
import java.util.List;

@RequestMapping("api")
@org.springframework.web.bind.annotation.RestController
@CrossOrigin(origins = "http://localhost:4200")
public class RestController {
    @Autowired
    DataHandler dataHandler;

    @RequestMapping("/getCategories")
    public String getCategories() {
        return convertToProperJson(dataHandler.getCategoriesAsJson());
    }

    @RequestMapping("/getColumns")
    public List<String> getColumns() {
        return dataHandler.getAllColumns();
    }

    @RequestMapping("/countByCategoryGroupedByMonth/{category}")
    public String countByCategoryGroupedByMonth(@PathVariable("category") String category) {
        return convertToProperJson(dataHandler.countByCategoryGroupedByDay(category));
    }

    @RequestMapping("/sql")
    public String sql(@QueryParam("sql") String sql, @QueryParam("page") int page) {
        return convertToProperJson(dataHandler.getDataWithSqlAsJson(sql, page));
    }
    @RequestMapping("/filter")
    public String filter(@QueryParam("sql") String query) {
        return convertToProperJson(dataHandler.getFilterData(query));
    }
    @RequestMapping("/getLongAndLat")
    public String getLongAndLat(@QueryParam("incidntNum") String incidntNum) {
        return convertToProperJson(dataHandler.getLongAndLat(incidntNum));
    }

    private String convertToProperJson(List<String> list) {
        return String.format("[%s]", String.join(",", list));
    }
}

