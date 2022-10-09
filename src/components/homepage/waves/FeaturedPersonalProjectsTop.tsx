import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const FeaturedPersonalProjectsWaveTop = () => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1440 320"
      style={{ filter: 'drop-shadow(0 -3px 6px rgba(0,0,0,0.16)) drop-shadow(0 -3px 6px rgba(0,0,0,0.23))' }}
    >
      <path
        fill={resolvedTheme === 'dark' ? '#D1D5DB' : '#1f2937'}
        fillOpacity="1"
        d="M0,0L18.5,16C36.9,32,74,64,111,101.3C147.7,139,185,181,222,208C258.5,235,295,245,332,234.7C369.2,224,406,192,443,176C480,160,517,160,554,176C590.8,192,628,224,665,224C701.5,224,738,192,775,176C812.3,160,849,160,886,181.3C923.1,203,960,245,997,229.3C1033.8,213,1071,139,1108,117.3C1144.6,96,1182,128,1218,122.7C1255.4,117,1292,75,1329,69.3C1366.2,64,1403,96,1422,112L1440,128L1440,320L1421.5,320C1403.1,320,1366,320,1329,320C1292.3,320,1255,320,1218,320C1181.5,320,1145,320,1108,320C1070.8,320,1034,320,997,320C960,320,923,320,886,320C849.2,320,812,320,775,320C738.5,320,702,320,665,320C627.7,320,591,320,554,320C516.9,320,480,320,443,320C406.2,320,369,320,332,320C295.4,320,258,320,222,320C184.6,320,148,320,111,320C73.8,320,37,320,18,320L0,320Z"
      ></path>
    </svg>
  ) : null;
};

export default FeaturedPersonalProjectsWaveTop;
