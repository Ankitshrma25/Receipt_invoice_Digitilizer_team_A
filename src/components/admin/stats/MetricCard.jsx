// import { Card, CardContent } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { TrendingUp, TrendingDown } from "lucide-react"

// export default function MetricCard({
//   title,
//   value,
//   icon: Icon,
//   trend = 0,
//   trendText = "from last month",
// }) {
//   const isPositive = trend >= 0

//   return (
//     <Card className="relative hover:shadow-lg transition duration-300">
//       <CardContent className="p-6 flex justify-between items-start">
        
//         {/* Left Section */}
//         <div>
//           <p className="text-sm text-muted-foreground mb-2">
//             {title}
//           </p>

//           <h2 className="text-2xl font-bold">
//             {value}
//           </h2>

//           <div className="mt-2 flex items-center gap-2">
//             <Badge
//               variant={isPositive ? "default" : "destructive"}
//               className="flex items-center gap-1 text-xs"
//             >
//               {isPositive ? (
//                 <TrendingUp size={14} />
//               ) : (
//                 <TrendingDown size={14} />
//               )}
//               {isPositive ? "+" : ""}
//               {trend}%
//             </Badge>

//             <span className="text-xs text-muted-foreground">
//               {trendText}
//             </span>
//           </div>
//         </div>

//         {/* Icon */}
//         <div className="p-3 rounded-lg bg-muted">
//           <Icon className="w-6 h-6 text-primary" />
//         </div>
//       </CardContent>
//     </Card>
//   )
// }