import { Button, Card, DescriptionsProps, Skeleton, Typography } from "antd";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import InfoCard from "src/components/infoCard";
import { ROUTE_ID } from "src/router";
import { appHelper, routerHelper, useFlat } from "src/service";
import { AddItemDrawerType } from "src/service/stores/ruleStore/model";
import TablePart from "../../components/bottomPart";
import styles from "./style.module.scss";
import DrawerView from "../../components/drawerView";

export interface DetailViewProps {
	branchName: string;
}

const DetailView = ({ branchName }: DetailViewProps) => {
	let [searchParams] = useSearchParams();
	const id = searchParams.get("id");
	const { setIsAddItemDrawerFlag } = useFlat(["ruleStore", branchName], {});
	const { currentData } = useFlat(["ruleStore", branchName]);
	const { t } = useTranslation("rule");
	const { t: commonT } = useTranslation("common");
	const { allPosList } = useFlat(["posStore", ROUTE_ID.RuleDetailPage], {
		allPosList: "IN",
	});
	const { allMarketList } = useFlat("marketStore", {
		allMarketList: "IN",
	});
	const { list: sortList } = useFlat("sortStore", {
		list: "IN",
	});
	const { list: filterList } = useFlat("filterStore", {
		list: "IN",
	});
	const items: DescriptionsProps["items"] = [
		{
			label: t`rulePage_ruleName`,
			children: currentData ? (
				currentData.ruleName
			) : (
				<Skeleton.Input block={true} active={true} />
			),
			span: { xl: 4, xxl: 4 },
		},
		{
			label: t`rulePage_originMarket`,
			children: currentData ? (
				<Typography.Link
					onClick={() => {
						setIsAddItemDrawerFlag({
							flag: true,
							type: AddItemDrawerType.market_detail,
							id: currentData!?.oriMarketId,
						});
					}}
				>
					{
						allMarketList
							.filter((item) => {
								return item.marketType === 0;
							})
							.find((item) => {
								return item.id == currentData!?.oriMarketId;
							})?.marketName
					}
				</Typography.Link>
			) : (
				<Skeleton.Input block={true} active={true} />
			),
			span: 3,
		},
		{
			label: t`rulePage_destinationMarket`,
			span: 1,
			children: currentData ? (
				<Typography.Link
					onClick={() => {
						setIsAddItemDrawerFlag({
							flag: true,
							type: AddItemDrawerType.market_detail,
							id: currentData!?.desMarketId,
						});
					}}
				>
					{
						allMarketList
							.filter((item) => {
								return item.marketType === 0;
							})
							.find((item) => {
								return item.id == currentData!?.desMarketId;
							})?.marketName
					}
				</Typography.Link>
			) : (
				<Skeleton.Input block={true} active={true} />
			),
		},
		{
			label: t`rulePage_pos`,
			span: 3,
			children: currentData ? (
				<Typography.Link
					onClick={() => {
						setIsAddItemDrawerFlag({
							flag: true,
							type: AddItemDrawerType.pos_detail,
							id: currentData!?.posId,
						});
					}}
				>
					{
						allPosList.find((item) => {
							return item.id == currentData!.posId;
						})?.posName
					}
				</Typography.Link>
			) : (
				<Skeleton.Input block={true} active={true} />
			),
		},
		{
			label: t`rulePage_applyProduct`,
			span: 2,
			children: currentData ? (
				[
					[1, "ISHOP"],
					[2, "DSHOP"],
				].find((item) => {
					return item[0] == currentData?.applyProduct;
				})?.[1]
			) : (
				<Skeleton.Input block={true} active={true} />
			),
		},
		{
			label: t`rulePage_effectDateRange`,
			span: 4,
			children: currentData ? (
				currentData?.effectStartDate ? (
					`${dayjs(currentData?.effectStartDate).format(
						"YYYY-MM-DD",
					)}~${dayjs(currentData?.effectEndDate).format(
						"YYYY-MM-DD",
					)}`
				) : (
					""
				)
			) : (
				<Skeleton.Input block={true} active={true} />
			),
		},
		{
			label: t`rulePage_sortItem`,
			span: 3,
			children: currentData ? (
				<Typography.Link
					onClick={() => {
						setIsAddItemDrawerFlag({
							flag: false,
							type: AddItemDrawerType.sort_detail,
							id: currentData!.sortItemId,
						});
					}}
				>
					{
						sortList.find((item) => {
							return (
								String(item.id) ==
								String(currentData!.sortItemId)
							);
						})?.sortItemName
					}
				</Typography.Link>
			) : (
				<Skeleton.Input block={true} active={true} />
			),
		},
		{
			label: t`rulePage_filterItem`,
			span: 2,
			children: currentData ? (
				<Typography.Link
					onClick={() => {
						setIsAddItemDrawerFlag({
							flag: false,
							type: AddItemDrawerType.filter_detail,
							id: currentData!.filterItemId,
						});
					}}
				>
					{
						filterList.find((item) => {
							return (
								String(item.id) ==
								String(currentData!.filterItemId)
							);
						})?.filterItemName
					}
				</Typography.Link>
			) : (
				<Skeleton.Input block={true} active={true} />
			),
		},
		{
			label: t`rulePage_sequenceNo`,
			span: 2,
			children: currentData ? (
				currentData?.sequenceNo
			) : (
				<Skeleton.Input block={true} active={true} />
			),
		},
		{
			label: t`rulePage_active`,
			span: 1,
			children: currentData ? (
				currentData?.status ? (
					"true"
				) : (
					"false"
				)
			) : (
				<Skeleton.Input block={true} active={true} />
			),
		},
		{
			label: t`rulePage_backupResult`,
			span: 2,
			children: currentData ? (
				currentData?.backupResult ? (
					"true"
				) : (
					"false"
				)
			) : (
				<Skeleton.Input block={true} active={true} />
			),
		},
		{
			label: t`rulePage.comment`,
			span: 12,
			children: currentData ? (
				currentData?.comment
			) : (
				<Skeleton.Input block={true} active={true} />
			),
		},
	];
	return (
		<div className={styles.container}>
			<div className={styles.btnTable}>
				<Button
					onClick={async () => {
						routerHelper.jumpTo(ROUTE_ID.RuleEditPage, {
							search: {
								id,
							},
						});
					}}
					style={{ marginRight: 10 }}
					type="primary"
				>
					{commonT`edit`}
				</Button>
				<Button
					onClick={() => {
						appHelper.closeTabByPath();
					}}
				>
					{commonT`cancel`}
				</Button>
			</div>
			<>
				<Card
					style={{
						marginBottom: "12px",
					}}
				>
					<InfoCard items={items}></InfoCard>
				</Card>
				<Card
					style={{
						minHeight: "300px",
						marginBottom: "30px",
					}}
				>
					<TablePart branchName={ROUTE_ID.RuleDetailPage}></TablePart>
				</Card>
			</>
			<DrawerView branchName={branchName} />
		</div>
	);
};
export default DetailView;
