package de.thm.mni.sparksfpolice;

import org.apache.spark.sql.Dataset;
import org.apache.spark.sql.Row;
import org.apache.spark.sql.SparkSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Component
public class DataHandler {
    @Autowired
    private SparkSession sparkSession;

    private Dataset<Row> data;


    @EventListener(ApplicationReadyEvent.class)
    private void doSomethingAfterStartup() {
        File file = null;
        try {
            file = new ClassPathResource("static/data.csv").getFile();
        } catch (IOException e) {
            sparkSession.log().info("File not found");
        }
        data = sparkSession.read().format("csv").option("header", "true").csv(file.getAbsolutePath()).cache();
        log("Initalized " + data.count() + " rows");
        data.printSchema();
    }


    private Dataset<Row> getRowDataset(String category) {
        return data.filter(c -> c.getAs("Category").equals(category.toUpperCase()));
    }


    public List<String> getCategoriesAsJson() {
        return data.select("Category").distinct().toJSON().collectAsList();
    }
    public List<String> getAllColumns() {
            return Arrays.asList(data.columns());
    }

    public List<String> countByCategoryGroupedByDay(String category) {
        return getRowDataset(category).groupBy("DayOfWeek").count().withColumnRenamed("DayOfWeek","name").withColumnRenamed("count","value").toJSON().collectAsList();

    }

    public List<String> getDataWithSqlAsJson(String sql, int page) {
        data.createOrReplaceTempView("data");
        return data.sqlContext().sql(sql).toJSON().collectAsList().subList((page - 1) * 50, (page * 50) - 1);
    }
    public List<String> getFilterData(String query) {
        return data.filter(query).toJSON().collectAsList();
    }

    public List<String> getLongAndLat(String incidntNum) {
        return data.filter("IncidntNum = " + incidntNum).select("X","Y").toJSON().collectAsList();
    }


    public void log(String msg) {
        this.sparkSession.log().info(msg);
    }
}
