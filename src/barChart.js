import timelineItems from "./timelineItems";
import { HorrizontalBar } from "./horrizontalBar";
import { useState } from "react";
import Moment from "moment";
import { extendMoment } from "moment-range";
import "./styles/styles.css";

const moment = extendMoment(Moment);

export const ChartData = (props) => {
  const [data, setData] = useState(props.timelineItems);
  const [zoom, setZoom] = useState(1.0);

  let sortEndData = [...data.sort((a, b) => (a.end > b.end ? 1 : -1))];
  let sortStartData = [
    ...data.sort((first, second) => (first.start > second.start ? 1 : -1)),
  ];

  let initialStart = [
    ...data.sort((first, second) => (first.start > second.start ? 1 : -1)),
  ][0].start;
  let highestEndDate = sortEndData[sortEndData.length - 1].end;
  let plotArray = [];
  let flag = true;

  while (flag !== false) {
    let nextArray = [];
    let start = initialStart;
    sortStartData.map((item) => {
      if (item.start >= start && item.end <= highestEndDate) {
        nextArray.push(item);
        start = item.end;
        sortStartData = sortStartData.filter((el) => {
          return el != item;
        });
      }
    });
    plotArray.push(nextArray);
    if (sortStartData.length === 0) {
      flag = false;
    }
  }

  let comp =
    plotArray.length > 0 ? (
      plotArray.map((arr, index) => {
        return arr.map((obj, key) => {
          let startDate = moment(obj.start, "YYYY-MM-DD");
          let endDate = moment(obj.end, "YYYY-MM-DD");
          let start = moment(initialStart, "YYYY-MM-DD");
          let divWidth = moment.duration(endDate.diff(startDate)).asDays() + 1;
          let divStart = moment.duration(startDate.diff(start)).asDays();
          return (
            <HorrizontalBar
              divWidth={divWidth}
              divStart={divStart}
              index={index}
              obj={obj}
            />
          );
        });
      })
    ) : (
      <p>loading...</p>
    );
  const range = Array.from(
    moment.range(initialStart, new Date(2021, 12, 31)).by("days")
  );
  let dateArray = range.map((m) => {
    return m.format("DD/MM/YYYY");
  });

  return (
    <div>
      <span class="buttonSection">
        <input
          type="button"
          class="button"
          onClick={() => {
            setZoom(zoom + 0.1);
          }}
          value="Zoom +"
        />
        <input
          type="button"
          class="button"
          onClick={() => {
            setZoom(zoom - 0.1);
          }}
          value="Zoom -"
        />
      </span>
      <div
        style={{
          overflow: "scroll",
          height: 300,
          width: "99%",
          position: "absolute",
          zoom: `${zoom}`,
        }}
      >
        {dateArray.map((item, key) => {
          return (
            <div
              class="cell"
              style={{ transform: `translate(${key * 76}px,0px)` }}
            >
              {item}
            </div>
          );
        })}
        {plotArray.map((num, index) => {
          return dateArray.map((item, key) => {
            return (
              <div
                class="cell"
                style={{
                  transform: `translate(${key * 76}px,${index * 41 + 41}px)`,
                }}
              ></div>
            );
          });
        })}
        {comp}
      </div>
    </div>
  );
};
