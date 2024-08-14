import React, { useState, useEffect } from "react";
import gsap from "gsap";
import SplitType from "split-type";
import toast from "react-hot-toast";
export default function App() {
  const [height, setHeight] = useState(0);
  const [kirpichvalue, setKirpichValue] = useState([
    { slope: [], length: [] },
  ]);
  const [scsvalue, setScsValue] = useState([{ slope: [], length: [], cn: [] }]);

  const [kirpichlength, setKirpichLength] = useState(null);
  const [kirpichslope, setKirpichSlope] = useState(null);
  const [scslength, setScsLength] = useState(null);
  const [scsslope, setScsSlope] = useState(null);

  // pagination
  const [currentKirpichPage, setCurrentKirpichPage] = useState(1);
  const [currentscsPage, setCurrentScsPage] = useState(1);
  const itemsPerPage = 10;
  const prepareKirlichTableData = () => {
    const lengths = kirpichvalue[0]?.length; // Assuming all data is in the first object
    const slopes = kirpichvalue[0]?.slope;

    // Create an array of objects combining these values
    return lengths.map((length, index) => ({
      length,
      slope: slopes[index],
    }));
  };
  const KirlichtableData = prepareKirlichTableData();

  const prepareScsTableData = () => {
    const lengths = scsvalue[0]?.length; // Assuming all data is in the first object
    const slopes = scsvalue[0]?.slope;
    const cn = scsvalue[0]?.cn;

    // Create an array of objects combining these values
    return lengths.map((length, index) => ({
      length,
      slope: slopes[index],
      cn: cn[index],
    }));
  };
  const ScstableData = prepareScsTableData();
  // Calculate total pages
  const totalKirpichTablePage = Math.ceil(
    scsvalue[0]?.length.length / itemsPerPage
  );
  const totalScsTablePage = Math.ceil(scsvalue[0]?.length.length / itemsPerPage);

  // Get current page data
  const indexOfLastItemkirpich = currentKirpichPage * itemsPerPage;
  const indexOfFirstItemkirpich = indexOfLastItemkirpich - itemsPerPage;
  const currentKirpichItems = KirlichtableData.slice(
    indexOfFirstItemkirpich,
    indexOfLastItemkirpich
  );

  // SCS page data
  const indexOfLastItemscs = currentscsPage * itemsPerPage;
  const indexOfFirstItemscs = indexOfLastItemscs - itemsPerPage;
  const currentscsItems = ScstableData.slice(
    indexOfFirstItemscs,
    indexOfLastItemscs
  );
  const generateKirpichValues = () => {
    const L = parseFloat(kirpichlength);
    const S = parseFloat(kirpichslope);

    if (L > 0 && L <= 100 && S >= 0.001 && S <= 0.2) {
      const slopes = [];
      for (let j = 0.001; j <= 0.2; j += 0.001) {
        slopes.push(j.toFixed(3));
      }

      let lengths = [];
      for (let i = 0.5; i <= 100; i += 0.5) {
        lengths.push(i.toFixed(3));
      }
      // // console.log(data); // Log the entire data array to check values
      setKirpichValue([
        {
          slope: slopes,
          length: lengths,
        },
      ]);
    } else {
      if (L > 100 || L < 1) {
        toast.error("Please ensure the length (L) is between 1 and 100");
      }
      if (S > 0.2 || S < 0.001) {
        toast.error("Please ensure the slope (S) is between 0.001 and 0.2");
      }
    }
  };

  const generateScsValues = () => {
    const L = parseFloat(scslength);
    const S = parseFloat(scsslope);

    if (L > 0 && S >= 0.001 && S <= 0.2) {
      let slopes = [];
      for (let j = 0.001; j <= 0.2; j += 0.001) {
        slopes.push(j);
        // console.log(`Added slope: ${j}`); // Logging the slope values
      }
      // generate length up to 100
      let lengths = [];
      for (let i = 0.5; i <= 100; i += 0.5) {
        lengths.push(i);
        // console.log(`Added length: ${i}`); // Logging the length values
      }
      // generate CN TO 100 FROM 1 AT A STEP OF 0.5
      let CN = [];
      for (let a = 1; a <= 100; a += 0.5) {
        CN.push(a);
        console.log(`Added CN: ${a}`); // Logging the length values
      }

      setScsValue([
        {
          slope: slopes,
          length: lengths,
          cn: CN,
        },
      ]);
    } else {
      if (L > 100 || L < 1) {
        toast.error("Please ensure the length (L) is between 1 and 100");
      }
      if (S > 0.2 || S < 0.001) {
        toast.error("Please ensure the slope (S) is between 0.001 and 0.2");
      }
    }
  };
  const handleKirpichClick = (page) => {
    setCurrentKirpichPage(page);
  };

  const handleScsClick = (page) => {
    setCurrentScsPage(page);
  };
  const renderKirpichPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalKirpichTablePage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handleKirpichClick(i)}
          className={`px-3 py-1 mx-1 ${
            i === currentKirpichPage ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  const renderScsPageNumbers = () => {
    const scspageNumbers = [];
    for (let i = 1; i <= totalScsTablePage; i++) {
      scspageNumbers.push(
        <button
          key={i}
          onClick={() => handleScsClick(i)}
          className={`px-3 py-1 mx-1 ${
            i === currentscsPage ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          {i}
        </button>
      );
    }
    return scspageNumbers;
  };
  useEffect(() => {
    const text1 = new SplitType(".hero_header");
    const text2 = new SplitType(".hero_header_2");
    // hero_text2
    // gsap.fromto;
    // gsap.timeline({ defaults: { ease: "SlowMo.easeOut" } });
    gsap
      .timeline()
      .to("body", { css: { visibility: "visible" } })
      .fromTo(
        text2?.chars,
        {
          y: "100%",
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          stagger: { amount: 0.6 },
          duration: 1,
          ease: "power4.out",
        },
        0.4
      )
      .fromTo(
        text1?.words,
        {
          y: "100%",
          opacity: 0,
          skew: 7,
        },
        {
          y: 0,
          skew: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 1.6,
          ease: "power4.out",
        },
        0.8
      )
      .fromTo(
        ".hero_card",
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 1,
          ease: "power4.out",
        }
      );
  }, []);
  // console.log(currentKirpichItems);
  return (
    <div className="based" style={{ height }}>
      <div className="w-full overflow-hidden py-40 flex items-center justify-center relative min-h-[100vh]">
        <div className="w-full py-6 z-[50] bg-[#000000c2] fixed top-0 flex items-center justify-between">
          <div className="w-full md:px-8 px-4 mx-auto md:max-w-[1600px] flex items-center justify-between">
            <h3 className="text-3xl md:text-3xl text-[#Fff] font-bold md:text-start">
              Daniel
            </h3>

            <h3 className="text-lg md:text-xl text-[#Fff] font-semibold md:text-start">
              Agric Eng.
            </h3>
          </div>
        </div>
        <div className="absolute h-full z-30 w-full gradient2"></div>
        <img
          src="/images/pics_1.jpg"
          alt=""
          className="absolute z-20 object-cover w-full h-full"
        />
        <div className="w-full h-full lg:px-0 z-40 px-4 md:max-w-[1200px] justify-center mx-auto flex flex-col gap-20">
          <div className="w-full flex flex-col">
            <div className="hide">
              <h2 className="text-6xl hero_header font-bold md:text-8xl lg:text-center text-[#fff]">
                Daniel's Project
              </h2>
            </div>
            <div className="hide">
              <span className="hero_header_2 px-4 lg:text-center family2 text-lg md:text-xl text-[var(--grey-1)]">
                A project demonstrating time of concentration using various
                Methods
              </span>
            </div>
          </div>
          <div className="w-full grid lg:grid-cols-2 gap-12">
            <div className="py-12 hero_card px-6 flex w-full rounded-lg bg-[#fff] flex-col gap-8">
              <h3 className="text-3xl md:text-4xl font-bold md:text-start">
                Kirpich Model
                <span className="block family2 mx-w-[500px] pr-4 text-sm font-normal md:text-base text-[var(--grey-1)]">
                  A project demonstrating time of concentration using Kirpich
                  Model
                </span>
              </h3>
              <div className="w-full flex flex-col gap-4">
                <label
                  htmlFor="length"
                  className="text-base font-semibold flex flex-col gap-2"
                >
                  Kirpich Length
                  <input
                    id="length"
                    value={kirpichlength}
                    type="number"
                    name="kirpichlength"
                    onChange={(e) => setKirpichLength(e.target.value)}
                    placeholder="Enter the Length"
                    className="border px-4  border-[rgba(0,0,0,.4)] outline-none text-sm w-full h-[50px] font-normal"
                  />
                </label>
                <label
                  htmlFor="slope"
                  className="text-base font-semibold flex flex-col gap-2"
                >
                  Kirpich Slope
                  <input
                    value={kirpichslope}
                    type="number"
                    name="kirpichslope"
                    onChange={(e) => setKirpichSlope(e.target.value)}
                    id="slope"
                    placeholder="Enter the Slope"
                    className="border px-4  border-[rgba(0,0,0,.4)] outline-none text-sm w-full h-[50px] font-normal"
                  />
                </label>
                <div className="w-full">
                  <button
                    onClick={generateKirpichValues}
                    style={{ transition: "all ease .4s" }}
                    className="px-4 text-[#fff] bg-[rgba(0,0,0,1)] hover:scale-[0.89] outline-none text-lg font-semibold w-full h-[70px] rounded-lg"
                  >
                    Submit
                  </button>
                </div>

                <div className="w-full flex items-center flex-wrap gap-2"></div>
              </div>
            </div>

            <div className="py-12 hero_card px-6 flex w-full rounded-lg bg-[#fff] flex-col gap-8">
              <h3 className="text-3xl md:text-4xl font-bold md:text-start">
                SCS Lag Model
                <span className="block family2 mx-w-[500px] pr-4 text-sm font-normal md:text-base text-[var(--grey-1)]">
                  A project demonstrating time of concentration using SCS Lag
                  Model
                </span>
              </h3>

              <div className="w-full flex flex-col gap-4">
                <label
                  htmlFor="length"
                  className="text-base font-semibold flex flex-col gap-2"
                >
                  SCS Length
                  <input
                    value={scslength}
                    name="scslength"
                    onChange={(e) => setScsLength(e.target.value)}
                    id="length"
                    type="number"
                    placeholder="Enter the Length"
                    className="border px-4  border-[rgba(0,0,0,.4)] outline-none number-sm w-full h-[50px] font-normal"
                  />
                </label>
                <label
                  htmlFor="slope"
                  className="text-base font-semibold flex flex-col gap-2"
                >
                  SCS Slope
                  <input
                    id="slope"
                    value={scsslope}
                    name="scsslope"
                    onChange={(e) => setScsSlope(e.target.value)}
                    type="number"
                    placeholder="Enter the Length"
                    className="border px-4  border-[rgba(0,0,0,.4)] outline-none text-sm w-full h-[50px] font-normal"
                  />
                </label>

                <div className="w-full">
                  <button
                    onClick={generateScsValues}
                    style={{ transition: "all ease .4s" }}
                    className="px-4 text-[#fff] bg-[rgba(0,0,0,1)] hover:scale-[0.89] outline-none text-lg font-semibold w-full h-[70px] rounded-lg"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full grid lg:grid-cols-2 gap-8">
            <div className="py-12 hero_card px-6 flex w-full rounded-lg bg-[#fff] items-center flex-col gap-4">
              <h4 className="text-2xl md:text-3xl font-bold md:text-start">
                Kirpich Time of Concentration
              </h4>
              <div className="w-full flex flex-wrap gap-4">
                <table className="min-w-full border-collapse border border-gray-400">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="border border-gray-400 px-4 py-2">
                        Index
                      </th>
                      <th className="border border-gray-400 px-4 py-2">
                        Length
                      </th>
                      <th className="border border-gray-400 px-4 py-2">
                        Slope
                      </th>
                      <th className="border border-gray-400 px-4 py-2">
                        Time of Concentration (Tc)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentKirpichItems.map((time, index) => {
                      // const { lengthWithSlope } = time;
                      const { length, slope } = time;
                      // console.log(length, slope, tc);
                      const tc =
                        (0.0195 * Math.pow(length, 0.77)) /
                        Math.pow(slope, 0.385);
                      return (
                        <tr key={index} className="bg-white even:bg-gray-100">
                          <td className="border border-gray-400 px-4 py-2">
                            {index + 1}
                          </td>
                          <td className="border border-gray-400 px-4 py-2">
                            {length}
                          </td>
                          <td className="border border-gray-400 px-4 py-2">
                            {slope}
                          </td>
                          <td className="border border-gray-400 px-4 py-2">
                            {tc.toFixed(3)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <div className="flex justify-center flex-wrap gap-2 mt-4">
                  {renderKirpichPageNumbers()}
                </div>
              </div>
            </div>
            {/* scs time of concentration */}
            <div className="py-12 hero_card px-6 flex w-full rounded-lg bg-[#fff] items-center flex-col gap-4">
              <h4 className="text-2xl md:text-3xl font-bold md:text-start">
                SCS Time of Concentration
              </h4>
              <div className="w-full flex flex-wrap gap-4">
                <table className="min-w-full border-collapse border border-gray-400">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="border border-gray-400 px-4 py-2">
                        Index
                      </th>
                      <th className="border border-gray-400 px-4 py-2">
                        Length
                      </th>
                      <th className="border border-gray-400 px-4 py-2">
                        Slope
                      </th>
                      <th className="border border-gray-400 px-4 py-2">CN</th>
                      <th className="border border-gray-400 px-4 py-2">
                        Time of Concentration (Tc)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentscsItems.map((time, index) => {
                      const { length, slope, cn } = time;
                      const Tc =
                        0.000877 *
                        Math.pow(length, 0.8) *
                        Math.pow(1000 / cn - 9, 0.7) *
                        Math.pow(slope, -0.5);
                      return (
                        <tr key={index} className="bg-white even:bg-gray-100">
                          <td className="border border-gray-400 px-4 py-2">
                            {indexOfFirstItemscs + index + 1}
                          </td>
                          <td className="border border-gray-400 px-4 py-2">
                            {length}
                          </td>
                          <td className="border border-gray-400 px-4 py-2">
                            {slope.toFixed(3)}
                          </td>
                          <td className="border border-gray-400 px-4 py-2">
                            {cn}
                          </td>
                          <td className="border border-gray-400 px-4 py-2">
                            {Tc.toFixed(3)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <div className="flex justify-center gap-2 flex-wrap mt-4">
                  {renderScsPageNumbers()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
