import { useNavigate } from "react-router-dom";
import styles from "./NotFound.module.scss";
import { Button, Flex, Grid, GridCol, Text } from "@mantine/core";
import { imageNotFound, imageNotFound2, imageNotFound3 } from "@/assets/img";
const PageNotFound = () => {
    const navigate = useNavigate();
    const onhandleToBack = () => {
        navigate(-1);
    };
    return (
        <div className="container padding">
            <Grid>
                <Grid.Col span={{ base: 12, lg: 6 }}>
                    <Flex
                        direction="column"
                        gap="lg"
                        className={styles.titleTextHeading}
                    >
                        <Text
                            fw={700}
                            size="xl"
                            className={styles.container__heading}
                        >
                            Trang không tồn tại
                        </Text>
                        <Button
                            className={styles.container__button}
                            variant="outline"
                            onClick={() => onhandleToBack()}
                        >
                            Quay lại trang chủ
                        </Button>
                    </Flex>
                </Grid.Col>
                <Grid.Col span={{ base: 12, lg: 6 }}>
                    <div className={styles.imageNotFound}>
                        <img src={imageNotFound} alt="" />
                    </div>
                </Grid.Col>
            </Grid>
        </div>
    );
};

export default PageNotFound;
