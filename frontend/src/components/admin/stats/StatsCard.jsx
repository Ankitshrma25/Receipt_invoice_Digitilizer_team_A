import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp } from "lucide-react"

export default function StatsCard({
  title,
  value,
  icon: Icon,
  trend = 0,
  color = "blue", 
}) {
  const colorStyles = {
    blue: {
      iconBg: "bg-blue-50",
      iconText: "text-blue-600",
      badge: "bg-blue-100 text-blue-700",
    },
    purple: {
      iconBg: "bg-purple-50",
      iconText: "text-purple-600",
      badge: "bg-purple-100 text-purple-700",
    },
    emerald: {
      iconBg: "bg-emerald-50",
      iconText: "text-emerald-600",
      badge: "bg-emerald-100 text-emerald-700",
    },
  }

  const styles = colorStyles[color]

  return (
    <Card className="hover:shadow-lg transition duration-300">
      <CardContent className="p-6 flex justify-between items-start">

        {/* Left */}
        <div>
          <p className="text-sm text-muted-foreground mb-1">
            {title}
          </p>

          <h2 className="text-2xl font-bold">
            {value}
          </h2>

          <Badge
            className={`mt-2 text-xs flex items-center gap-1 w-fit ${styles.badge}`}
          >
            <TrendingUp size={14} />
            +{trend}%
          </Badge>
        </div>

        {/* Icon */}
        <div className={`p-3 rounded-lg ${styles.iconBg}`}>
          <Icon className={`w-6 h-6 ${styles.iconText}`} />
        </div>

      </CardContent>
    </Card>
  )
}