// export default function BackgroundGrid() {
//   return (
//     <div className="fixed inset-0 -z-10 bg-[#030303] overflow-hidden">
//       {/* 1. The "Superbackground" Blue Glow */}
//       <div 
//         className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-600/20 blur-[120px] rounded-full opacity-50" 
//       />

//       {/* 2. The Grid with Perspective Mask */}
//       <div
//         className="absolute inset-0 opacity-20"
//         style={{
//           backgroundImage:
//             "linear-gradient(to right, #4f4f4f 1px, transparent 1px), linear-gradient(to bottom, #4f4f4f 1px, transparent 1px)",
//           backgroundSize: "45px 45px",
//           maskImage: "radial-gradient(ellipse 80% 50% at 50% 0%, black, transparent 90%)",
//           WebkitMaskImage: "radial-gradient(ellipse 80% 50% at 50% 0%, black, transparent 90%)",
//         }}
//       />
      
//       {/* 3. Bottom Fade to pure black */}
//       <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-transparent" />
//     </div>
//   );
// }

export default function BackgroundGrid() {
  return (
    <div className="fixed inset-0 -z-0 overflow-hidden pointer-events-none">
      {/* The Grid Lines - Increased visibility to #ffffff10 (approx 6% opacity) */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff10 1px, transparent 1px), 
                            linear-gradient(to bottom, #ffffff10 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
          maskImage: "radial-gradient(circle at 50% 0%, black, transparent 85%)",
          WebkitMaskImage: "radial-gradient(circle at 50% 0%, black, transparent 85%)",
        }}
      />

      {/* The Blue Atmospheric Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/20 blur-[120px] rounded-full" />
    </div>
  );
}