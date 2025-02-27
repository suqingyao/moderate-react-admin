import { useFormFields } from "src/common/hooks";
import { Form, Modal, message } from "antd";
import { useEffect, useRef } from "react";
import useConfig from "../../useConfig";
import { useFlat } from "src/service";
import { useTranslation } from "react-i18next";
import { EditViewProps } from "src/pages/HomePage/CpdPage/MarketPage/views/editView";

const ModalForm = ({ handleCancel }: EditViewProps) => {
    const [form] = Form.useForm<any>();

    const {
        isDetail,
        isShowModal,
        setIsShowModal,
        currentData,
        createAct,
        updateAct,
        queryListAct,
    } = useFlat("sortStore");
    const { formList } = useConfig();
    const FormFields = useFormFields(formList, {
        formIns: form,
        isJustShow: isDetail,
    });
    const { t } = useTranslation(["sort"]);
    useEffect(() => {
        if (isShowModal && currentData) {
            form.setFieldsValue(currentData);
        }
    }, [currentData, isShowModal]);

    const prime_id = useRef(undefined);
    return (
        <Modal
            open={isShowModal}
            title={
                currentData
                    ? isDetail
                        ? t`sortItem.SortItemDetail`
                        : t`sortItem.EditsortItem`
                    : t`sortItem.NewsortItem`
            }
            okText={t`sortItem.Save`}
            cancelText={t`sortItem.Cancel`}
            footer={isDetail ? null : undefined}
            onCancel={() => {
                form.resetFields();
                setIsShowModal(false);
                handleCancel?.();
            }}
            onOk={() => {
                form.validateFields()
                    .then(async (value) => {
                        let act = currentData ? updateAct : createAct;
                        let values = currentData
                            ? {
                                  ...currentData,
                                  ...value,
                                  sortString: value.sortString.join("-"),
                              }
                            : {
                                  ...value,
                                  ownerId: "FN",
                                  sortString: value.sortString.join("-"),
                              };
                        const { payload } = await act(values);
                        if (payload?.code == 0 || payload?.code == 200) {
                            message.success({
                                content: t`sortItem.Succeed`,
                            });
                        }
                        setIsShowModal(false);
                        handleCancel?.();
                        form.resetFields();
                        queryListAct();
                    })
                    .catch((info) => {
                        console.log("Validate Failed:", info);
                    });
            }}
        >
            <Form<any>
                form={form}
                onFieldsChange={(values) => {
                    // 当prime_id表单修改，并且修改新的值和旧的值不一样的时候，清空parent_id
                    if (
                        values[0].name === "prime_id" &&
                        prime_id.current !== values[0].value
                    ) {
                        prime_id.current = values[0].value;
                        form.setFieldValue("parent_id", "");
                    }
                }}
            >
                {FormFields}
            </Form>
        </Modal>
    );
};

export default ModalForm;
