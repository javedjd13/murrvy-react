import { useMemo, useState } from "react";
import { Range, getTrackBackground } from "react-range";
import { useDispatch } from "react-redux";
import { AccordionBody, AccordionHeader, AccordionItem } from "reactstrap";
import { Prices } from "@/constant";
import { PRICEFILTER } from "@/ReduxToolkit/Reducers/ProductFilterReducer";

const PriceRange = ({ productData = [] }) => {
  const dispatch = useDispatch();
  const priceRate = useMemo(() => {
    const uniquePrices = Array.from(
      new Set(
        (Array.isArray(productData) ? productData : [])
          .map((item) => Number(item?.price || 0))
          .filter((value) => Number.isFinite(value)),
      ),
    );

    return uniquePrices.sort((a, b) => a - b);
  }, [productData]);
  const MIN = priceRate.length ? priceRate[0] : 0;
  const MAX = priceRate.length ? priceRate[priceRate.length - 1] : 120;
  const [values1, setValues1] = useState([MIN, MAX]);
  const handleChange = (values) => {
    setValues1(values);
    dispatch(PRICEFILTER(values));
  };

  return (
    <AccordionItem className="category-price">
      <AccordionHeader targetId="3">{Prices}</AccordionHeader>
      <AccordionBody accordionId="3">
        <div
          className="range-category"
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            margin: "1em",
          }}
        >
          <Range
            values={values1}
            step={1}
            min={MIN}
            max={MAX + 10}
            onChange={(values) => handleChange(values)}
            renderTrack={({ props, children }) => (
              <div
                onMouseDown={props.onMouseDown}
                onTouchStart={props.onTouchStart}
                style={{
                  ...props.style,
                  height: "100px",
                  display: "flex",
                  width: "100%",
                }}
              >
                <div
                  ref={props.ref}
                  style={{
                    height: "5px",
                    width: "100%",
                    borderRadius: "4px",
                    background: getTrackBackground({
                      values: values1,
                      colors: ["#e22454", "#e22454", "#e22454"],
                      min: MIN,
                      max: MAX,
                    }),
                    alignSelf: "center",
                  }}
                >
                  {children}
                </div>
              </div>
            )}
            renderThumb={({ index, props, isDragged }) => (
              <div
                {...props}
                key={index}
                style={{
                  ...props.style,
                  height: "32px",
                  width: "32px",
                  borderRadius: "4px",
                  backgroundColor: "#e22454",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  boxShadow: "0px 2px 6px #AAA",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "-35px",
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: "14px",
                    fontFamily: "Arial,Helvetica Neue,Helvetica,sans-serif",
                    padding: "4px",
                    borderRadius: "4px",
                    backgroundColor: "#e22454",
                  }}
                >
                  {values1[index].toFixed(1)}
                </div>
                <div
                  style={{
                    height: "16px",
                    width: "5px",
                    backgroundColor: isDragged ? "#e22454" : "#CCC",
                  }}
                />
              </div>
            )}
          />
        </div>
      </AccordionBody>
    </AccordionItem>
  );
};

export default PriceRange;
