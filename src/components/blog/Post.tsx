"use client";

import { Column, Flex, Heading, Media, SmartLink, Tag, Text } from '@once-ui-system/core';
import { formatDate } from '@/utils/formatDate';
import styles from './Posts.module.scss';
import Image from "next/image";

interface PostProps {
    post: any;
    thumbnail: boolean;
    direction?: "row" | "column";
}

export default function Post({ post, thumbnail, direction }: PostProps) {
    return (
        <SmartLink
            fillWidth
            unstyled
            style={{ borderRadius: 'var(--radius-l)' }}
            key={post.slug}
            href={`/blog/${post.slug}`}>
            <Flex
                position="relative"
                transition="micro-medium"
                direction={direction}
                radius="l"
                className={styles.hover}
                mobileDirection="column"
                fillWidth>
                {post.metadata.image && thumbnail && (
                    <Image
                      className={styles.image}
                      src={post.metadata.image}
                      alt={'Thumbnail of ' + post.metadata.title}
                      width={640}
                      height={360}
                      style={{
                        width: '100%',
                        height: 'auto',
                        objectFit: 'cover',
                        borderRadius: 'var(--radius-l)',
                        border: '1px solid var(--neutral-alpha-weak)',
                        cursor: 'pointer'
                      }}
                      unoptimized
                    />
                )}
                <Column
                    position="relative"
                    fillWidth gap="4"
                    padding="24"
                    vertical="center">
                    <Heading
                        as="h2"
                        variant="heading-strong-l"
                        wrap="balance">
                        {post.metadata.title}
                    </Heading>
                    <Text
                        variant="label-default-s"
                        onBackground="neutral-weak">
                        {formatDate(post.metadata.publishedAt, false)}
                    </Text>
                    { post.metadata.tag &&
                        <Tag
                            className="mt-12"
                            label={post.metadata.tag}
                            variant="neutral" />
                    }
                </Column>
            </Flex>
        </SmartLink>
    );
}