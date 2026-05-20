import pandas as pd
import numpy as np

def compute_all_metrics(df: pd.DataFrame) -> dict:
    """Compute all dashboard metrics from the raw dataframe."""
    return {
        "kpis": compute_kpis(df),
        "engagement": compute_engagement(df),
        "products": compute_product_depth(df),
        "geography": compute_geography(df),
        "rsi": compute_rsi(df),
        "pipeline": compute_pipeline_stats(df),
    }

def compute_kpis(df: pd.DataFrame) -> list:
    total = len(df)
    churned = df["Exited"].sum()
    churn_rate = (churned / total) * 100

    active = df[df["IsActiveMember"] == 1]
    inactive = df[df["IsActiveMember"] == 0]
    active_churn = (active["Exited"].sum() / len(active)) * 100 if len(active) > 0 else 0
    inactive_churn = (inactive["Exited"].sum() / len(inactive)) * 100 if len(inactive) > 0 else 0
    engagement_gap = inactive_churn - active_churn

    two_prod = df[df["NumOfProducts"] == 2]
    two_prod_churn = (two_prod["Exited"].sum() / len(two_prod)) * 100 if len(two_prod) > 0 else 0

    germany = df[df["Geography"] == "Germany"]
    germany_churn = (germany["Exited"].sum() / len(germany)) * 100 if len(germany) > 0 else 0

    return [
        {
            "id": "churn",
            "label": "Baseline Churn Rate",
            "value": f"{churn_rate:.2f}%",
            "numericValue": round(churn_rate, 2),
            "note": f"{churned:,} of {total:,} customers exited",
            "barWidth": round(churn_rate, 2),
            "color": "amber",
        },
        {
            "id": "gap",
            "label": "Engagement Retention Gap",
            "value": f"+{engagement_gap:.2f}pp",
            "numericValue": round(engagement_gap, 2),
            "note": f"Active {active_churn:.2f}% vs Inactive {inactive_churn:.2f}% churn",
            "barWidth": round(min(engagement_gap * 3, 100), 2),
            "color": "teal",
        },
        {
            "id": "sweet",
            "label": "Two-Product Sweet Spot",
            "value": f"{two_prod_churn:.2f}%",
            "numericValue": round(two_prod_churn, 2),
            "note": f"Lowest churn — exactly 2 products held (n={len(two_prod):,})",
            "barWidth": round(two_prod_churn, 2),
            "color": "white",
        },
        {
            "id": "germany",
            "label": "Germany Churn Rate",
            "value": f"{germany_churn:.2f}%",
            "numericValue": round(germany_churn, 2),
            "note": f"+{germany_churn - churn_rate:.1f}pp above global average",
            "barWidth": round(germany_churn, 2),
            "color": "coral",
        },
    ]

def compute_engagement(df: pd.DataFrame) -> list:
    active = df[df["IsActiveMember"] == 1]
    inactive = df[df["IsActiveMember"] == 0]
    total = len(df)
    churned = df["Exited"].sum()

    active_churn = round((active["Exited"].sum() / len(active)) * 100, 2) if len(active) > 0 else 0
    inactive_churn = round((inactive["Exited"].sum() / len(inactive)) * 100, 2) if len(inactive) > 0 else 0
    global_churn = round((churned / total) * 100, 2)

    return [
        {"segment": "Active Members",   "churnRate": active_churn,   "fill": "#14b8a6"},
        {"segment": "Inactive Members", "churnRate": inactive_churn, "fill": "#f87171"},
        {"segment": "Global Average",   "churnRate": global_churn,   "fill": "#f5a623"},
    ]

def compute_product_depth(df: pd.DataFrame) -> list:
    labels = {1: "High Risk", 2: "Sweet Spot ✦", 3: "Overloaded", 4: "Critical"}
    fills  = {1: "#f5a623",   2: "#14b8a6",       3: "#f87171",   4: "#ef4444"}
    result = []

    for n in [1, 2, 3, 4]:
        group = df[df["NumOfProducts"] == n]
        rate = round((group["Exited"].sum() / len(group)) * 100, 2) if len(group) > 0 else 0
        result.append({
            "products": f"{n} Product{'s' if n > 1 else ''}",
            "churnRate": rate,
            "count": len(group),
            "label": labels[n],
            "fill": fills[n],
        })

    return result

def compute_geography(df: pd.DataFrame) -> list:
    geo_meta = {
        "France": {
            "code": "FR", "color": "#14b8a6",
            "bgAlpha": "rgba(20,184,166,0.08)", "borderAlpha": "rgba(20,184,166,0.3)",
            "status": "Stable",
            "note": "Stable retention. Below global average. Standard engagement programs apply.",
        },
        "Germany": {
            "code": "DE", "color": "#f87171",
            "bgAlpha": "rgba(248,113,113,0.08)", "borderAlpha": "rgba(248,113,113,0.35)",
            "status": "Critical",
            "note": "Severe systemic outlier. Driven by fragmented domestic market, regional cooperative networks, and aggressive digital disruptors.",
        },
        "Spain": {
            "code": "ES", "color": "#14b8a6",
            "bgAlpha": "rgba(20,184,166,0.08)", "borderAlpha": "rgba(20,184,166,0.3)",
            "status": "Stable",
            "note": "Stable retention. Mirrors France. Standard engagement programs apply without localized adjustment.",
        },
    }

    result = []
    for geo in ["France", "Germany", "Spain"]:
        group = df[df["Geography"] == geo]
        rate = round((group["Exited"].sum() / len(group)) * 100, 2) if len(group) > 0 else 0
        result.append({
            "country": geo,
            "customerCount": len(group),
            "churnRate": rate,
            **geo_meta[geo],
        })

    return result

def compute_rsi(df: pd.DataFrame) -> dict:
    max_tenure = int(df["Tenure"].max())
    if max_tenure == 0:
        max_tenure = 1

    # Compute RSI for each row
    rsi_scores = (
        (df["IsActiveMember"] * 30) +
        (df["NumOfProducts"].clip(upper=4) * 15) +
        (df["HasCrCard"] * 10) +
        (df["Tenure"] / max_tenure * 25) +
        ((df["Balance"] > 0).astype(int) * 20)
    ) / 1.45

    df_rsi = df.copy()
    df_rsi["RSI_norm"] = rsi_scores

    retained = df_rsi[df_rsi["Exited"] == 0]
    churned = df_rsi[df_rsi["Exited"] == 1]

    retained_avg = round(retained["RSI_norm"].mean(), 2) if len(retained) > 0 else 0
    churned_avg = round(churned["RSI_norm"].mean(), 2) if len(churned) > 0 else 0

    # Tier buckets
    tiers = {}
    for tier_name, low, high in [("risk", 0, 40), ("nurture", 40, 65), ("sticky", 65, 100)]:
        mask = (df_rsi["RSI_norm"] >= low) & (df_rsi["RSI_norm"] < high)
        tier_group = df_rsi[mask]
        tier_churned = tier_group["Exited"].sum()
        tiers[tier_name] = {
            "count": int(len(tier_group)),
            "churnRate": round((tier_churned / len(tier_group)) * 100, 2) if len(tier_group) > 0 else 0,
        }

    return {
        "maxTenure": max_tenure,
        "retainedAvgRsi": retained_avg,
        "churnedAvgRsi": churned_avg,
        "delta": round(retained_avg - churned_avg, 2),
        "tiers": tiers,
    }

def compute_pipeline_stats(df: pd.DataFrame) -> dict:
    total = len(df)
    churned = int(df["Exited"].sum())
    churn_rate = round((churned / total) * 100, 2) if total > 0 else 0

    active = df[df["IsActiveMember"] == 1]
    inactive = df[df["IsActiveMember"] == 0]
    active_churn = round((active["Exited"].sum() / len(active)) * 100, 2) if len(active) > 0 else 0
    inactive_churn = round((inactive["Exited"].sum() / len(inactive)) * 100, 2) if len(inactive) > 0 else 0
    engagement_gap = round(inactive_churn - active_churn, 2)

    balances = df["Balance"].sort_values()
    q75 = int(balances.quantile(0.75)) if not balances.empty else 0
    hi_bal_inactive = df[(df["Balance"] >= q75) & (df["IsActiveMember"] == 0)]
    hi_bal_inactive_churn = round((hi_bal_inactive["Exited"].sum() / len(hi_bal_inactive)) * 100, 2) if len(hi_bal_inactive) > 0 else 0

    no_card = df[df["HasCrCard"] == 0]
    has_card = df[df["HasCrCard"] == 1]
    no_card_rate = (no_card["Exited"].sum() / len(no_card)) if len(no_card) > 0 else 0
    has_card_rate = (has_card["Exited"].sum() / len(has_card)) if len(has_card) > 0 else 0
    card_reduction = round((no_card_rate - has_card_rate) * 100, 2)

    return {
        "totalRows": total,
        "totalChurned": churned,
        "churnRate": churn_rate,
        "activeChurn": active_churn,
        "inactiveChurn": inactive_churn,
        "engagementGap": engagement_gap,
        "q75Balance": q75,
        "highBalanceDisengagedCount": int(len(hi_bal_inactive)),
        "highBalanceDisengagedChurn": hi_bal_inactive_churn,
        "zeroBalanceCount": int((df["Balance"] == 0).sum()),
        "maxTenure": int(df["Tenure"].max()) if not df.empty else 0,
        "creditCardChurnReduction": card_reduction,
    }
