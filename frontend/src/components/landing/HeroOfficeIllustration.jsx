import React from 'react';

const HeroOfficeIllustration = ({ maxWidth = '840px' }) => {
  const containerRef = React.useRef(null);
  const [scale, setScale] = React.useState(0.66);

  React.useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth;
        if (width > 0) {
          setScale(width / 1265);
        }
      }
    };
    updateScale();
    const observer = new ResizeObserver(updateScale);
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    window.addEventListener('resize', updateScale);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateScale);
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      style={{ 
        width: '100%', 
        maxWidth: maxWidth, 
        margin: '0 auto', 
        position: 'relative',
        height: `${Math.round(808 * scale)}px`,
        overflow: 'hidden'
      }}
    >
      <div 
        style={{ 
          position: 'absolute', 
          top: 0,
          left: 0,
          width: '1265px', 
          height: '808px', 
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          pointerEvents: 'none'
        }}
      >
        <div
          id="_3323_316__19184614_6101000_1"
          style={{
            position: "relative",
            overflow: "hidden",
            height: "100%",
            width: "100%",
            left: "0px",
            top: "0px",
          }}
        >
          <img
            id="_3323_318__Group"
            src="/assets/Landingpageimages/group_4.svg"
            alt="Group"
            style={{
              position: "absolute",
              left: "calc(100% * 0.24)",
              top: "calc(100% * 0.05)",
            }}
          />
          <img
            id="_3323_321__Group"
            src="/assets/Landingpageimages/group_5.svg"
            alt="Group"
            style={{
              position: "absolute",
              left: "calc(100% * 0.67)",
              top: "calc(100% * 0.05)",
            }}
          />

          <img
            id="_3323_324__Picture"
            src="/assets/Landingpageimages/picture.svg"
            alt="Picture"
            style={{
              position: "absolute",
              left: "calc(100% * 0.75)",
              top: "calc(100% * 0.18)",
            }}
          />
          <img
            id="_3323_339__Group"
            src="/assets/Landingpageimages/group_6.svg"
            alt="Group"
            style={{
              position: "absolute",
              left: "calc(100% * 0.78)",
              top: "calc(100% * 0.51)",
            }}
          />
          <img
            id="_3323_373__Group"
            src="/assets/Landingpageimages/group_7.svg"
            alt="Group"
            style={{
              position: "absolute",
              left: "calc(100% * 0.83)",
              top: "calc(100% * 0.79)",
            }}
          />

          <img
            id="_3323_385__Group"
            src="/assets/Landingpageimages/group_8.svg"
            alt="Group"
            style={{
              position: "absolute",
              left: "calc(100% * 0.68)",
              top: "calc(100% * 0.41)",
            }}
          />
          <img
            id="_3323_390__Vector"
            src="/assets/Landingpageimages/vector_7.svg"
            alt="Vector"
            style={{
              position: "absolute",
              left: "calc(100% * 0.70)",
              top: "calc(100% * 0.44)",
            }}
          />
          <img
            id="_3323_391__Vector"
            src="/assets/Landingpageimages/vector_8.svg"
            alt="Vector"
            style={{
              position: "absolute",
              left: "calc(100% * 0.72)",
              top: "calc(100% * 0.38)",
            }}
          />
          <img
            id="_3323_392__Vector"
            src="/assets/Landingpageimages/vector_9.svg"
            alt="Vector"
            style={{
              position: "absolute",
              left: "calc(100% * 0.72)",
              top: "calc(100% * 0.52)",
            }}
          />
          <img
            id="_3323_393__Vector"
            src="/assets/Landingpageimages/vector_10.svg"
            alt="Vector"
            style={{
              position: "absolute",
              left: "calc(100% * 0.74)",
              top: "calc(100% * 0.53)",
            }}
          />
          <img
            id="_3323_394__Vector"
            src="/assets/Landingpageimages/vector_11.svg"
            alt="Vector"
            style={{
              position: "absolute",
              left: "calc(100% * 0.74)",
              top: "calc(100% * 0.59)",
            }}
          />
          <img
            id="_3323_395__Vector"
            src="/assets/Landingpageimages/vector_12.svg"
            alt="Vector"
            style={{
              position: "absolute",
              left: "calc(100% * 0.72)",
              top: "calc(100% * 0.85)",
            }}
          />
          <img
            id="_3323_396__Vector"
            src="/assets/Landingpageimages/vector_13.svg"
            alt="Vector"
            style={{
              position: "absolute",
              left: "calc(100% * 0.74)",
              top: "calc(100% * 0.87)",
            }}
          />
          <img
            id="_3323_397__Vector"
            src="/assets/Landingpageimages/vector_14.svg"
            alt="Vector"
            style={{
              position: "absolute",
              left: "calc(100% * 0.73)",
              top: "calc(100% * 0.37)",
            }}
          />
          <img
            id="_3323_398__Group"
            src="/assets/Landingpageimages/group_9.svg"
            alt="Group"
            style={{
              position: "absolute",
              left: "calc(100% * 0.72)",
              top: "calc(100% * 0.28)",
            }}
          />
          <img
            id="_3323_404__Vector"
            src="/assets/Landingpageimages/vector_15.svg"
            alt="Vector"
            style={{
              position: "absolute",
              left: "calc(100% * 0.73)",
              top: "calc(100% * 0.26)",
            }}
          />
          <img
            id="_3323_405__Vector"
            src="/assets/Landingpageimages/vector_16.svg"
            alt="Vector"
            style={{
              position: "absolute",
              left: "calc(100% * 0.74)",
              top: "calc(100% * 0.37)",
            }}
          />
          <img
            id="_3323_406__Group"
            src="/assets/Landingpageimages/group_10.svg"
            alt="Group"
            style={{
              position: "absolute",
              left: "calc(100% * 0.67)",
              top: "calc(100% * 0.43)",
            }}
          />
          <img
            id="_3323_411__Vector"
            src="/assets/Landingpageimages/vector_17.svg"
            alt="Vector"
            style={{
              position: "absolute",
              left: "calc(100% * 0.70)",
              top: "calc(100% * 0.41)",
            }}
          />
          <img
            id="_3323_412__Vector"
            src="/assets/Landingpageimages/vector_18.svg"
            alt="Vector"
            style={{
              position: "absolute",
              left: "calc(100% * 0.75)",
              top: "calc(100% * 0.60)",
            }}
          />

          <img
            id="_3323_415__Vector"
            src="/assets/Landingpageimages/vector_19.svg"
            alt="Vector"
            style={{
              position: "absolute",
              left: "calc(100% * 0.56)",
              top: "calc(100% * 0.53)",
            }}
          />
          <img
            id="_3323_416__Group"
            src="/assets/Landingpageimages/group_11.svg"
            alt="Group"
            style={{
              position: "absolute",
              left: "calc(100% * 0.53)",
              top: "calc(100% * 0.36)",
            }}
          />
          <img
            id="_3323_426__Group"
            src="/assets/Landingpageimages/group_12.svg"
            alt="Group"
            style={{
              position: "absolute",
              left: "calc(100% * 0.59)",
              top: "calc(100% * 0.36)",
            }}
          />
          <img
            id="_3323_429__Group"
            src="/assets/Landingpageimages/group_13.svg"
            alt="Group"
            style={{
              position: "absolute",
              left: "calc(100% * 0.59)",
              top: "calc(100% * 0.23)",
            }}
          />
          <img
            id="_3323_438__Vector"
            src="/assets/Landingpageimages/vector_20.svg"
            alt="Vector"
            style={{
              position: "absolute",
              left: "calc(100% * 0.61)",
              top: "calc(100% * 0.34)",
            }}
          />
          <img
            id="_3323_439__Group"
            src="/assets/Landingpageimages/group_14.svg"
            alt="Group"
            style={{
              position: "absolute",
              left: "calc(100% * 0.54)",
              top: "calc(100% * 0.51)",
            }}
          />
          <img
            id="_3323_443__Group"
            src="/assets/Landingpageimages/group_15.svg"
            alt="Group"
            style={{
              position: "absolute",
              left: "calc(100% * 0.58)",
              top: "calc(100% * 0.37)",
            }}
          />
          <img
            id="_3323_446__Vector"
            src="/assets/Landingpageimages/vector_21.svg"
            alt="Vector"
            style={{
              position: "absolute",
              left: "calc(100% * 0.53)",
              top: "calc(100% * 0.50)",
            }}
          />
          <img
            id="_3323_447__Group"
            src="/assets/Landingpageimages/group_16.svg"
            alt="Group"
            style={{
              position: "absolute",
              left: "calc(100% * 0.49)",
              top: "calc(100% * 0.51)",
            }}
          />

          <img
            id="_3323_451__Vector"
            src="/assets/Landingpageimages/vector_22.svg"
            alt="Vector"
            style={{
              position: "absolute",
              left: "calc(100% * 0.02)",
              top: "calc(100% * 0.87)",
            }}
          />
          <img
            id="_3323_453__Group"
            src="/assets/Landingpageimages/group_17.svg"
            alt="Group"
            style={{
              position: "absolute",
              left: "calc(100% * 0.21)",
              top: "calc(100% * 0.58)",
            }}
          />
          <img
            id="_3323_456__Vector"
            src="/assets/Landingpageimages/vector_23.svg"
            alt="Vector"
            style={{
              position: "absolute",
              left: "calc(100% * 0.21)",
              top: "calc(100% * 0.38)",
            }}
          />
          <img
            id="_3323_457__Vector"
            src="/assets/Landingpageimages/vector_24.svg"
            alt="Vector"
            style={{
              position: "absolute",
              left: "calc(100% * 0.13)",
              top: "calc(100% * 0.52)",
            }}
          />
          <img
            id="_3323_458__Group"
            src="/assets/Landingpageimages/group_18.svg"
            alt="Group"
            style={{
              position: "absolute",
              left: "calc(100% * 0.10)",
              top: "calc(100% * 0.34)",
            }}
          />
          <img
            id="_3323_468__Vector"
            src="/assets/Landingpageimages/vector_25.svg"
            alt="Vector"
            style={{
              position: "absolute",
              left: "calc(100% * 0.18)",
              top: "calc(100% * 0.34)",
            }}
          />
          <img
            id="_3323_469__Vector"
            src="/assets/Landingpageimages/vector_26.svg"
            alt="Vector"
            style={{
              position: "absolute",
              left: "calc(100% * 0.19)",
              top: "calc(100% * 0.35)",
            }}
          />
          <img
            id="_3323_470__Group"
            src="/assets/Landingpageimages/group_19.svg"
            alt="Group"
            style={{
              position: "absolute",
              left: "calc(100% * 0.13)",
              top: "calc(100% * 0.22)",
            }}
          />
          <img
            id="_3323_480__Vector"
            src="/assets/Landingpageimages/vector_27.svg"
            alt="Vector"
            style={{
              position: "absolute",
              left: "calc(100% * 0.15)",
              top: "calc(100% * 0.33)",
            }}
          />
          <img
            id="_3323_481__Group"
            src="/assets/Landingpageimages/group_20.svg"
            alt="Group"
            style={{
              position: "absolute",
              left: "calc(100% * 0.07)",
              top: "calc(100% * 0.62)",
            }}
          />
          <img
            id="_3323_484__Vector"
            src="/assets/Landingpageimages/vector_28.svg"
            alt="Vector"
            style={{
              position: "absolute",
              left: "calc(100% * 0.10)",
              top: "calc(100% * 0.59)",
            }}
          />

          <img
            id="_3323_485__Device"
            src="/assets/Landingpageimages/device.svg"
            alt="Device"
            style={{
              position: "absolute",
              left: "calc(100% * 0.28)",
              top: "calc(100% * 0.41)",
            }}
          />
          <img
            id="_3323_492__Group"
            src="/assets/Landingpageimages/group_21.svg"
            alt="Group"
            style={{
              position: "absolute",
              left: "calc(100% * 0.44)",
              top: "calc(100% * 0.41)",
            }}
          />
          <img
            id="_3323_497__Vector"
            src="/assets/Landingpageimages/vector_29.svg"
            alt="Vector"
            style={{
              position: "absolute",
              left: "calc(100% * 0.37)",
              top: "calc(100% * 0.75)",
            }}
          />
          <img
            id="_3323_498__Vector"
            src="/assets/Landingpageimages/vector_30.svg"
            alt="Vector"
            style={{
              position: "absolute",
              left: "calc(100% * 0.36)",
              top: "calc(100% * 0.71)",
            }}
          />

          <img
            id="_3323_501__Vector"
            src="/assets/Landingpageimages/vector_31.svg"
            alt="Vector"
            style={{
              position: "absolute",
              left: "calc(100% * 0.29)",
              top: "calc(100% * 0.63)",
            }}
          />
          <img
            id="_3323_502__Vector"
            src="/assets/Landingpageimages/vector_32.svg"
            alt="Vector"
            style={{
              position: "absolute",
              left: "calc(100% * 0.58)",
              top: "calc(100% * 0.63)",
            }}
          />
          <img
            id="_3323_504__Vector"
            src="/assets/Landingpageimages/vector_33.svg"
            alt="Vector"
            style={{
              position: "absolute",
              left: "calc(100% * 0.26)",
              top: "calc(100% * 0.59)",
            }}
          />

          <img
            id="_3323_505__Vector"
            src="/assets/Landingpageimages/vector_34.svg"
            alt="Vector"
            style={{
              position: "absolute",
              left: "calc(100% * 0.26)",
              top: "calc(100% * 0.59)",
            }}
          />
          <img
            id="_3323_506__Vector"
            src="/assets/Landingpageimages/vector_35.svg"
            alt="Vector"
            style={{
              position: "absolute",
              left: "calc(100% * 0.25)",
              top: "calc(100% * 0.58)",
            }}
          />

          <img
            id="_3323_508__Vector"
            src="/assets/Landingpageimages/vector_36.svg"
            alt="Vector"
            style={{
              position: "absolute",
              transform: "rotate(81.93deg)",
              transformOrigin: "0 0",
              left: "calc(100% * 0.54)",
              top: "calc(100% * 0.04)",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default HeroOfficeIllustration;
