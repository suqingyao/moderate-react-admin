import classNames from "classnames";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import styles from "./style.module.scss";
import { useFlat } from "src/service";

const CategroyDetail = (props: { branchName: string }) => {
    const { t } = useTranslation();
    const { targetItinerary } = useFlat(["ruleStore", props.branchName]);
    const targetItineraryState = targetItinerary(undefined);
    const {
        noInterline,
        noOverNight,
        carrier,
        operateCarriers,
        notOperateCarriers,
        allowCodeShare,
        flightCategory = 1,
    } = targetItineraryState || {};
    let useFlagInitValue = true,
        searchSelectInitValue = "ALL";
    if (operateCarriers) {
        useFlagInitValue = true;
        searchSelectInitValue = operateCarriers;
    } else if (notOperateCarriers) {
        useFlagInitValue = false;
        searchSelectInitValue = notOperateCarriers;
    }
    return (
        <div className={styles.container}>
            <div className={styles.itFormItem}>
                <div className={styles.itFormItemText}>
                    {`${t("rule:rulePage_flightCategory")}:`}
                </div>
                <div>
                    {
                        {
                            1: t("rule:rulePage_NONSTOP"),
                            2: t("rule:rulePage_DIRECT"),
                            3: t("rule:rulePage_CONNECTION"),
                        }[flightCategory]
                    }
                </div>
            </div>

            <div
                className={classNames(styles.itFormItem, styles.itFormItemFlex)}
            >
                {flightCategory === 3 ? (
                    <Fragment>
                        <div className={styles.itFormItemFlex2}>
                            <div
                                className={
                                    !noOverNight
                                        ? styles.redPoint
                                        : styles.noRedPoint
                                }
                            ></div>

                            <span>
                                {noOverNight
                                    ? t("rule:rulePage_noOverNight2")
                                    : t("rule:rulePage_overNight")}
                            </span>
                        </div>
                        <div className={styles.itFormItemFlex2}>
                            <div
                                className={
                                    !noInterline
                                        ? styles.redPoint
                                        : styles.noRedPoint
                                }
                            ></div>

                            <span>
                                {noInterline
                                    ? t("rule:rulePage_nointerline2")
                                    : t("rule:rulePage_interline")}
                            </span>
                        </div>
                    </Fragment>
                ) : (
                    <Fragment>
                        <div>
                            <div className={styles.itFormItemFlex2}>
                                {allowCodeShare == 1 ? (
                                    <div className={styles.noRedPoint}></div>
                                ) : (
                                    <div className={styles.redPoint}></div>
                                )}
                                <span>
                                    {allowCodeShare == 1
                                        ? ""
                                        : t("rule:rulePage_not")}
                                    {t("rule:rulePage_allowCodeShare")}
                                </span>
                            </div>
                        </div>
                        <div>
                            <span className={styles.itFormItemText2}>
                                {t("rule:rulePage_carriers")}:
                            </span>
                            <span className={styles.itFormItemText2}>
                                {carrier}
                            </span>
                        </div>
                        {allowCodeShare == 1 && (
                            <div>
                                <span className={styles.itFormItemText2}>
                                    {!useFlagInitValue &&
                                        t("rule:rulePage_not2")}
                                    {t("rule:rulePage_operateCarriers")}:
                                </span>
                                <span className={styles.itFormItemText2}>
                                    {searchSelectInitValue}
                                </span>
                            </div>
                        )}
                    </Fragment>
                )}
            </div>
        </div>
    );
};

export default CategroyDetail;
